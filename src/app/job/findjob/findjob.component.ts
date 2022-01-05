import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { concat, pipe, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss']
})
export class FindjobComponent implements OnInit{

  public workerID!:string;
  public checkboxValue : boolean = true;
  public workersReview:any
  private subscription: Subscription = new Subscription();
  constructor(private router: Router, private activeRoute: ActivatedRoute, private dataService:dataService) { }
  
  ngOnInit(): void {
    this.dataService.getWorkers().subscribe(
      response =>{
        this.workersReview = response;
      });
  }


  /*i need get all times and compare it, if the time of this worker its the most recent in review 
  then it will be redirected to another function that auth if its the last divider
  if both are true he will be redirected to another component that has not been created yet
  */
 workers:Array<{id:number,lastReview:any,lastDivition:any}> = []
 time:Array<any> = [];
 mostRecentReviewer:Array<any> = ['04/01/2022, 10:59 AM'];
  nextStep() {

    //this obtain the workers
    this.workerID =  this.activeRoute.snapshot.params['id'];
    this.workersReview.forEach((i:any)=>{
      this.workers.push({
        id: i._id, 
        lastReview: i.lastReview,
        lastDivition: i.lastDivition
      });
    });

    //this obtain the most recent date
    this.workers.forEach((i:any)=>{
      if (moment(i.lastReview).isAfter(this.time)){
        this.mostRecentReviewer = [];
        console.log("este valor " + i.lastReview + " es mayor a este " + this.time);
        this.mostRecentReviewer.push(i);
        console.log(this.mostRecentReviewer);
      }
      this.time = i.lastReview;
    });

    if (this.workerID == this.mostRecentReviewer[0].id) {
      this.router.navigate(['inicio/revisar']);
    }
  }
}
