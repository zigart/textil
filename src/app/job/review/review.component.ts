import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/services/machine/machine.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private workerID!:string;
  public worker!:any;
  private updateSubscription:Subscription = new Subscription();
  public machines:any;
  public machineSubscription: Subscription = new Subscription()
  constructor(
    private dataService:dataService, 
    private activeRoute:ActivatedRoute,
    private route: Router,
    private machineService: MachineService) { }

  ngOnInit(): void {

    this.machineSubscription = this.machineService.machineList.subscribe(
      (response)=>{this.machines = response});

    this.workerID = this.activeRoute.snapshot.params['id'];

    this.dataService.getWorker(this.workerID).subscribe(
    (response)=>{
      this.worker = response
      console.log(this.worker);
    }, 
    (error)=>{
      console.log(error);
    });
  }


  refreshDate(){
    this.worker.lastReview = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
    this.route.navigate(['inicio/trabajo/' + this.workerID]);
  }

}
