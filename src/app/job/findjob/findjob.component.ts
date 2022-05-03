import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { machine } from 'src/app/models/machine.model';
import { dataService } from 'src/app/services/data.service';
import { DivideService } from 'src/app/services/divide/divide.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { WorkersService } from 'src/app/services/workers/workers.service';


/**
 * this component asign a job
 *
 * @export
 * @class FindjobComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss'],
})
export class FindjobComponent implements OnInit, OnDestroy {
  public workerID!: string;
  public worker!: any;
  private machinesByReview!:Array<machine>;
  private machinesByDivition!:Array<machine>;

  public checkboxValue: boolean = true;
  public workersReviewAndDivide: any;
  private subscription: Subscription = new Subscription();
  public routes: Array<string> = ['inicio/password/'+ this.workerID + '/revisar', 'inicio/password/' +this.workerID +'/separar'];
  private currentWork: any = {
    _id: '',
    work: '',
    machine: {},
  };


  /*CREO QUE HUBO UN ERROR DE COMUNICACION, EL TRABAJADOR NO TIENE QUE REALIZAR EL MISMO TRABAJO DOS VECES SEGUDAS
  PERO PUEDE SER EL ULTIMO EN REALIZAR EL TRABAJO DOS VECES... REVISAR MEJOR ESO*/
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataService: dataService,
    private workerService: WorkersService,
    private divideService:DivideService,
    private reviewService: ReviewService
  ) {}
  /**
   * @function ngOnInit
   *
   * @description get workers and asign default boolean values
   *
   * @param booleanMostRecentDivider
   * @param booleanMostRecentReview
   *
   * @memberof FindjobComponent
   */
  ngOnInit(): void {
    this.workerID = this.activeRoute.parent?.snapshot.params['id'];
    this.subscription = this.dataService.getWorker(this.workerID).subscribe((response) => {
      this.worker = response;
    });

    this.dataService.getWorker(this.workerID).subscribe(
      response => {
        this.worker = response;
      }
    )
  }

  /**
   * @function ngOnDestroy
   *
   * @description
   * destroy the subscription
   *
   * @memberof FindjobComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 

  check() {
    this.workerID = this.activeRoute.parent?.snapshot.params['id'];
    this.dataService.getCurrentWork(this.workerID).subscribe(
      response => {
        this.currentWork = response;
        if (this.currentWork.work == 'divide') {
          this.router.navigate(['inicio/password/' + this.workerID+ '/separar']);
        } else if (this.currentWork.work == 'review') {
          this.router.navigate(['inicio/password/' + this.workerID+ '/revisar']);
        }
      },
      error => {
        if(error.status == 404){
          this.statusCheck();
        }
      }
    );

    
  }

  /**
 * @function statusCheck
 * 
 * @description if the date of this worker its the most recent in review then it will be redirected to another
 function that auth if its the last divider if both are true he will be redirected to smallJobs
 * 
 *
 * @memberof FindjobComponent
 */

 private machines:Array<machine> = [];
statusCheck() {
  
  this.dataService.getMachines().subscribe(
    response => {
      this.machines = response;
      this.machinesByReview = [...this.machines];
      this.machinesByDivition = [...this.machines];  
      this.redirectDependingValue(); 
      });}
      
      
      /**
   * @function redirectDependingValue
   *
   * @description depending of the booleans this function redirect to some section
   *
   * @memberof FindjobComponent
   *
   * @returns redirection
   */

  redirectDependingValue(){
    
    this.machinesByReview.sort((a: any, b: any) => {
     return <any>DateTime.fromISO(a.lastReview) - <any>DateTime.fromISO(b.lastReview);
   })

   this.machinesByDivition.sort((a: any, b: any) => {
     return <any>DateTime.fromISO(a.lastDivition) - <any>DateTime.fromISO(b.lastDivition);
    })
 

    if(DateTime.now().diff( DateTime.fromISO(this.machinesByDivition[0].lastDivition)).toMillis() < 7200000 
    && DateTime.now().diff( DateTime.fromISO(this.machinesByReview[0].lastReview)).toMillis() < 7200000){
      this.worker.lastWork = 'completed';
    }

    if (
      ( this.worker.activeReviewer && this.worker.lastWork == 'divide') || (this.worker.activeReviewer && !this.worker.activeDivider && this.worker.lastWork == 'review') && (DateTime.now().diff( DateTime.fromISO(this.machinesByReview[0].lastReview)).toMillis() > 7200000)
      ) {
        this.router.navigate(['inicio/password/' + this.workerID + '/revisar']);
      } else if (
        (this.worker.activeDivider && this.worker.lastWork == 'review') || (this.worker.activeDivider && !this.worker.activeReviewer && this.worker.lastWork == 'divde') && (DateTime.now().diff( DateTime.fromISO(this.machinesByDivition[0].lastDivition)).toMillis() > 7200000)
        ) {
          this.router.navigate(['inicio/password/' + this.workerID + '/separar']);
        } else if(
      this.worker.lastWork == 'completed'
    ){
      this.router.navigate(['inicio/password/' + this.workerID + '/trabajos-secundarios']);
    }
  }


}
