import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { concat, pipe, Subscription } from 'rxjs';
import { worker } from 'src/app/models/worker.model';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss']
})
export class FindjobComponent implements OnInit, OnDestroy{
  
  public workerID!:string;
  public checkboxValue : boolean = true;
  public workersReviewAndDivide:any
  private subscription: Subscription = new Subscription();
  public  workers:Array<{id:number,lastReview:any,lastDivider:any}> = []
  public timeReview:string = '2021-01-01T00:00:00.000-03:00';
  public timeDivider:string = '2021-01-01T00:00:00.000-03:00';
  public booleanMostRecentReview:boolean = false;
  public booleanMostRecentDivider:boolean = false;
  public mostRecentDivider:DateTime = DateTime.fromISO('2021-01-01T00:00:00.000-03:00');
  public routes:Array<string> = ['inicio/revisar/', 'inicio/separar/' ]
  public mostRecent:any = {
   id: '',
   lastDivition: '2021-01-01T00:00:00.000-03:00',
   lastReview: '2021-01-01T00:00:00.000-03:00'
  };
  constructor(private router: Router, private activeRoute: ActivatedRoute, private dataService:dataService) { }
  
  ngOnInit(): void {
    this.subscription = this.dataService.getWorkers().subscribe(
      response =>{
        this.workersReviewAndDivide = response;
      });
      this.booleanMostRecentDivider = false;
      this.booleanMostRecentReview = false;
    }
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  /*i need get all dates and compare it, if the date of this worker its the most recent in review 
  then it will be redirected to another function that auth if its the last divider
  if both are true he will be redirected to another component that has not been created yet
  */



 statusCheck() {

  //get worker ID
   this.workerID =  this.activeRoute.snapshot.params['id'];

   //Redefine the booleans
   this.booleanMostRecentDivider = false;
   this.booleanMostRecentReview = false;

   //get workers
    this.workersReviewAndDivide.forEach((i:any)=>{
      this.workers.push({
        id: i._id, 
        lastReview: i.lastReview,
        lastDivider: i.lastDivition
      });
    });

    //these functions define if the worker is the last or not
    this.lastReviewer();
    this.lastDivider();

    //redirige
    this.redirectDependingValue()

  }

  lastReviewer(){
    
    //FIXME: change type of value. i'm working with string type but i need work with date type
    
    this.workers.forEach((i:any)=>{

 
     if ( DateTime.fromISO(i.lastReview)  > DateTime.fromISO(this.timeReview)  &&
     DateTime.fromISO(i.lastReview) > DateTime.fromISO(this.mostRecent.lastReview)){
        this.mostRecent = {};
        this.mostRecent = i;
      }

      this.timeReview = i.lastReview;

    });

    if (this.workerID == this.mostRecent.id) {
      this.booleanMostRecentReview = true;
    }
  }

  lastDivider(){
    this.workers.forEach((i:any)=>{
      
      if ( DateTime.fromISO(i.lastDivider)  > DateTime.fromISO(this.timeDivider)  &&
      DateTime.fromISO(i.lastDivider) > DateTime.fromISO(this.mostRecent.lastDivider)){

        this.mostRecent = {};
        this.mostRecent = i;

      }
      this.timeDivider = i.lastDivider;
    });

    if (this.workerID == this.mostRecent.id) {
      this.booleanMostRecentDivider = true;
      console.log(this.booleanMostRecentDivider, 'es el ultimo');
    }

  }

  redirectDependingValue(){

    if (this.booleanMostRecentReview && !this.booleanMostRecentDivider) {
      this.router.navigate(['inicio/separar/', this.workerID]);

    }else if(!this.booleanMostRecentReview && this.booleanMostRecentDivider){

      this.router.navigate(['inicio/revisar/', this.workerID]);

    }else if(this.booleanMostRecentReview && this.booleanMostRecentDivider){

      this.router.navigate(['inicio/trabajos-secundarios/', this.workerID]);

    }else if(!this.booleanMostRecentReview && !this.booleanMostRecentDivider){

      this.router.navigate([this.routes[Math.floor(Math.random() * this.routes.length)], this.workerID]);

    }}
  }

