import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { concat, pipe, Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss']
})
export class FindjobComponent implements OnInit{

  public workerID!:string;
  public checkboxValue : boolean = true;
  public workersReviewAndDivide:any
  private subscription: Subscription = new Subscription();
  constructor(private router: Router, private activeRoute: ActivatedRoute, private dataService:dataService) { }
  
  ngOnInit(): void {
    this.dataService.getWorkers().subscribe(
      response =>{
        this.workersReviewAndDivide = response;
      });
  }


  /*i need get all dates and compare it, if the date of this worker its the most recent in review 
  then it will be redirected to another function that auth if its the last divider
  if both are true he will be redirected to another component that has not been created yet
  */
 workers:Array<{id:number,lastReview:any,lastDivider:any}> = []
 timeReview:Array<any> = ['01/01/2000, 10:00'];
 timeDivider:Array<any> = ['01/01/2000, 10:00'];
 mostRecentReviewer:Array<any> = ['01/01/2000, 10:00'];
 mostRecentDivider:Array<any> = ['01/01/2000, 10:00']
  statusCheck() {

    //this gets the workers
    this.workerID =  this.activeRoute.snapshot.params['id'];
    this.workersReviewAndDivide.forEach((i:any)=>{
      this.workers.push({
        id: i._id, 
        lastReview: i.lastReview,
        lastDivider: i.lastDivition
      });
    });

    //this gets the most recent date
    this.lastReviewer();
    this.lastDivider()
  }

  lastReviewer(){
    this.workers.forEach((i:any)=>{
      if (moment(i.lastReview).isAfter(this.timeReview)
      && moment(i.lastReview).isAfter(this.mostRecentReviewer[0].lastReviewer) ){
        this.mostRecentReviewer = [];
        console.log("este valor " + i.lastReview + " es mayor a este " + this.timeReview);
        this.mostRecentReviewer.push(i);
        console.log(this.mostRecentReviewer);
      }
      this.timeReview = i.lastReview;
    });

    if (this.workerID == this.mostRecentReviewer[0].id) {
      this.router.navigate(['inicio/revisar']);
    }
  }

  lastDivider(){
    this.workers.forEach((i:any)=>{
      if (moment(i.lastDivider).isAfter(this.timeDivider)
      && moment(i.lastDivider).isAfter(this.mostRecentDivider[0].lastDivider)){
        this.mostRecentDivider = [];
        console.log("este valor en divider" + i.lastDivider + " es mayor a este " + this.timeDivider);
        this.mostRecentDivider.push(i);
        console.log(this.mostRecentDivider);
      }
      this.timeDivider = i.lastDivider;
    });
    if (this.workerID == this.mostRecentDivider[0].id) {
      this.router.navigate(['inicio/separar']);
    }
  }
}
