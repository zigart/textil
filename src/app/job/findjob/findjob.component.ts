import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
  constructor(private router: Router, private activeRoute: ActivatedRoute, private dataService:dataService) { }
  
  ngOnInit(): void {
    this.subscription = this.dataService.getWorkers().subscribe(
      response =>{
        this.workersReviewAndDivide = response;
      });
    }
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  /*i need get all dates and compare it, if the date of this worker its the most recent in review 
  then it will be redirected to another function that auth if its the last divider
  if both are true he will be redirected to another component that has not been created yet
  */
 workers:Array<{id:number,lastReview:any,lastDivider:any}> = []
 timeReview:Array<any> = ['01/01/2000, 10:00'];
 timeDivider:Array<any> = ['01/01/2000, 10:00'];
 mostRecent:any = {
   id: '',
   lastDivition: '01/01/2000, 10:00',
   lastReview: '01/01/2000, 10:00'
 };

 booleanMostRecentReview:boolean = false;
 booleanMostRecentDivider:boolean = false;

 mostRecentDivider:Array<any> = ['01/01/2000, 10:00'];
 routes:Array<any> = ['inicio/revisar/', 'inicio/separar/' ]
 statusCheck() {
   this.workerID =  this.activeRoute.snapshot.params['id'];
   
   //this gets the workers
    this.workersReviewAndDivide.forEach((i:any)=>{
      this.workers.push({
        id: i._id, 
        lastReview: i.lastReview,
        lastDivider: i.lastDivition
      });
    });

    //this gets the most recent date
    this.lastReviewer();
    this.lastDivider();

    if (this.booleanMostRecentReview && !this.booleanMostRecentDivider) {
      this.router.navigate(['inicio/separar/', this.workerID]);
    }else if(!this.booleanMostRecentReview && this.booleanMostRecentDivider){
      this.router.navigate(['inicio/revisar/', this.workerID]);
    }else if(this.booleanMostRecentReview && this.booleanMostRecentDivider){
      this.router.navigate(['inicio/trabajos-secundarios/', this.workerID]);
    }else if(!this.booleanMostRecentDivider && !this.booleanMostRecentReview)

    if (this.workerID != this.mostRecent.id) {
      this.router.navigate([this.routes[Math.floor(Math.random() * this.routes.length)], this.workerID]);
    }
  }

  lastReviewer(){
    this.workers.forEach((i:any)=>{
    console.log(i.lastReview, moment(i.lastReview).isAfter(this.timeReview), this.timeReview, moment(i.lastReview).isAfter(this.mostRecent.lastReview), this.mostRecent)
      if (moment(i.lastReview).isAfter(this.timeReview)
      && moment(i.lastReview).isAfter(this.mostRecent.lastReview)){

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

      if (moment(i.lastDivider).isAfter(this.timeDivider)
      && moment(i.lastDivider).isAfter(this.mostRecent.lastDivider)){

        this.mostRecent = {};
        this.mostRecent = i;

      }
      this.timeDivider = i.lastDivider;
    });

    if (this.workerID == this.mostRecent.id) {
      this.booleanMostRecentDivider = true;
    }

  }
}
