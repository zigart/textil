import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private workerID!:string;
  public worker!:any;
  private updateSubscription:Subscription = new Subscription();
  constructor(private dataService:dataService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.workerID = this.activeRoute.snapshot.params['id'];
    this.dataService.getWorker(this.workerID).subscribe(
    (response)=>{
      this.worker = response
      console.log(this.worker);
    }, 
    (error)=>{
      console.log(error);
    }
    );
  }


  refreshDate(){
    this.worker.lastReview = moment().format('DD/MM/yyyy, HH:mm');
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
