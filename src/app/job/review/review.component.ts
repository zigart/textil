import { Component, ViewChild, ElementRef, OnInit, Renderer2,  } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/services/machine/machine.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { reviews } from 'src/app/models/reviews.model'

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

  @ViewChild('startView') startView!:ElementRef;
  @ViewChild('status') status!:ElementRef;
  @ViewChild('problemsView') problemsView!:ElementRef;

  private workerID!:string;
  public worker!:any;
  public colth!:number;
  public failed!:number;
  private updateSubscription:Subscription = new Subscription();
  private machines:Array<object> = [];
  public machineSubscription: Subscription = new Subscription();
  public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';
  public problems!:string;
  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
  }


  public individualMachineCurrent:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '',
    lastReview: ''
  }

  public individualMachineObtained:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '',
    lastReview: ''
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
    private render:Renderer2,
    private dataService:dataService, 
    private activeRoute:ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) { }

/**
 * @function ngOnInit
 * 
 * @description obtains the machines, workers and the ID of the specific worker  
 *
 * @memberof ReviewComponent
 */
ngOnInit(): void {

  this.workerID = this.activeRoute.parent?.snapshot.params['id'];

    this.dataService.getWorker(this.workerID).subscribe(
    (response)=>{
      this.worker = response
    }, 
    (error)=>{
      console.log(error);
    });
    
    this.reviewService.workerID = this.workerID;
    this.reviewService.getMachineToReview();
    
    
    
    this.reviewService.individualMachine2.subscribe(
      response => {
        this.individualMachineObtained = response;
      });   

    this.dataService.getCurrentWork(this.workerID).subscribe(
      response => {
        this.individualMachine = response.machine;
        this.dataService.updateActiveMachine(response.machine._id, response.machine).subscribe();
        
      },
      error => {
        this.individualMachine = this.individualMachineObtained;
        this.individualMachine.lastReview = DateTime.now().toString();
        this.dataService.updateActiveMachine(this.individualMachineObtained._id, this.individualMachineObtained).subscribe();
        }
      );
      
  
    }
  
  start(){

    this.render.setStyle(this.startView.nativeElement, 'display', 'none');
    this.render.setStyle(this.status.nativeElement, 'display', 'flex');
    this.worker.lastReview = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe();
    
    
  }
  
  
  /**
   * @function saveReviewData
   * 
   * @description this function save the review data in the ddbb
   *
   * @memberof ReviewComponent
   */
  
  like(){
  let review = new reviews(this.worker,this.individualMachine, true, DateTime.now().toString(), '');
  this.individualMachine.lastReview = DateTime.now().toString();
  this.dataService.sendReview(review).subscribe();
  this.dataService.updateActiveMachine(this.individualMachineObtained._id, this.individualMachineObtained).subscribe();
  this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();
  this.dataService.deleteCurrentWork(this.workerID).subscribe();
  this.render.setStyle(this.status.nativeElement, 'display', 'none');
  this.router.navigate(['inicio/trabajo/' + this.workerID]);
  }

  dislike(){
    this.render.setStyle(this.problemsView.nativeElement, 'display', 'flex');
    this.render.setStyle(this.status.nativeElement, 'display', 'none');
    
  }

  saveProblem(){
    let review = new reviews(this.worker,this.individualMachine, false, DateTime.now().toString(), this.problems);
    this.individualMachine.lastReview = DateTime.now().toString();
    this.dataService.sendReview(review).subscribe();
    this.dataService.updateActiveMachine(this.individualMachineObtained._id, this.individualMachineObtained).subscribe();
    this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();
    this.dataService.deleteCurrentWork(this.workerID).subscribe();
    this.router.navigate(['inicio/password/' + this.workerID+ '/trabajo']);
  }

}
