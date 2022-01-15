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
  private machines:Array<object> = [];
  public machineSubscription: Subscription = new Subscription();
  public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';
  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
   };
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

    this.getMachineToReview();
  }


  refreshDate(){
    this.worker.lastReview = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      });
      this.individualMachine.lastReview = DateTime.now().toString();
      this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();


    this.route.navigate(['inicio/trabajo/' + this.workerID]);
  }

  getMachineToReview(){
    
    this.machines.forEach((machine:any) =>{
      
      if (this.individualMachine.machineNumber === 0) {
        this.individualMachine = machine;
        console.log(machine, 'hola');
      }

      if ( DateTime.fromISO(machine.lastReview) < DateTime.fromISO(this.lastOneMachine) 
      && DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.individualMachine.lastReview)) {
        
        this.individualMachine = {}
        this.individualMachine = machine;

      }

      this.lastOneMachine = machine.lastReview;


    });
  }

}
