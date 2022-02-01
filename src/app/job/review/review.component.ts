import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/services/machine/machine.service';
import { ReviewService } from 'src/app/services/review/review.service';

/**
 * this component asign a machine to review and update the dates
 *
 * @export
 * @class ReviewComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private workerID!:string;
  public worker!:any;
  public colth!:number;
  public failed!:number;
  private updateSubscription:Subscription = new Subscription();
  private machines:Array<object> = [];
  public machineSubscription: Subscription = new Subscription();
  public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';
  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
  }
  public reviewForm:any = {
    worker: {},
    machine: {},
    date: '',
    colth: 0,
    failed: 0
  }
  /**
   * Creates an instance of ReviewComponent.
   * @param {dataService} dataService
   * @param {ActivatedRoute} activeRoute
   * @param {Router} route
   * @param {MachineService} machineService
   * @memberof ReviewComponent
   */

  constructor(
    private dataService:dataService, 
    private activeRoute:ActivatedRoute,
    private route: Router,
    private machineService: MachineService,
    private reviewService: ReviewService) { }

/**
 * @function ngOnInit
 * 
 * @description obtains the machines, workers and the ID of the specific worker  
 *
 * @memberof ReviewComponent
 */
ngOnInit(): void {

    this.workerID = this.activeRoute.snapshot.params['id'];

    this.dataService.getWorker(this.workerID).subscribe(
    (response)=>{
      this.worker = response
    }, 
    (error)=>{
      console.log(error);
    });

    this.reviewService.getMachineToReview();
    this.reviewService.individualMachine2.subscribe(
      (response) => {
        this.individualMachine = response
      }
    );
  }
/**
 * @function saveReviewData
 * 
 * @description this function save the review data in the ddbb
 *
 * @memberof ReviewComponent
 */
saveReviewData(){
    this.reviewForm.worker = this.worker;
    this.reviewForm.machine = this.individualMachine;
    this.reviewForm.date = DateTime.now().toString();
    this.reviewForm.colth = this.colth;
    this.reviewForm.failed = this.failed;

    this.dataService.sendReviewForm(this.reviewForm).subscribe();
  }



/**
 * @function refreshDate
 * 
 * @description update the saved date with the current date and redirect to findjob
 * 
 * @memberof ReviewComponent
 */

refreshDate(){
    this.worker.lastReview = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe();

     this.saveReviewData();
      
      this.individualMachine.lastReview = DateTime.now().toString();
      this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();


    this.route.navigate(['inicio/trabajo/' + this.workerID]);
  }
/**
 * @function getMachineToReview
 * 
 * @description get the oldes machine reviewed and asign it to review
 *
 * @memberof ReviewComponent
 * 
 * @returns machine object
 */

}
