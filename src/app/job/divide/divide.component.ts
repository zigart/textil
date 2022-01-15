import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { MachineService } from 'src/app/services/machine/machine.service';

@Component({
  selector: 'app-divide',
  templateUrl: './divide.component.html',
  styleUrls: ['./divide.component.scss']
})
export class DivideComponent implements OnInit {

  @ViewChild('start') start!:ElementRef;
  @ViewChild('finish') finish!:ElementRef;

  public workerID!:string;
  public worker:any;
  private updateSubscription:Subscription = new Subscription();
  private machines:Array<object> = [];
  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
   };
  constructor(
    private render:Renderer2,
    private activeRoute: ActivatedRoute,
    private dataService: dataService,
    private machineService:MachineService
  ) { }



  ngOnInit(): void {
    this.workerID = this.activeRoute.snapshot.params['id'];
    
     this.machineService.machineList.subscribe(
       (response)=>{
         this.machines = response;
       }
     )

    this.dataService.getWorker(this.workerID).subscribe(
      (response)=>{
        this.worker = response;
        console.log(this.worker);
      }, 
      (error)=>{
        console.log(error);
      }
      );
      
      this.getMachineToDivide();
    
  }


  /**
   *Refresh the time in the 'lastDivide' in the worker obtained by id in the url worker
   *
   * @memberof DivideComponent
   */
  startCount(){
    this.render.setStyle(this.start.nativeElement, 'display', 'none');
    this.render.setStyle(this.finish.nativeElement, 'display', 'block');
    this.worker.lastDivition = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  finishCount(){
    this.render.setStyle(this.start.nativeElement, 'display', 'block');
    this.render.setStyle(this.finish.nativeElement, 'display', 'none');
    this.individualMachine.lastDivition = DateTime.now().toString();
    this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }


//TODO: add logic to get the most important machine to divide

public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';
getMachineToDivide(){
    
    this.machines.forEach((machine:any) =>{
      
      if (this.individualMachine.machineNumber === 0) {
        this.individualMachine = machine;
      }

      if ( DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.lastOneMachine) 
      && DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.individualMachine.lastDivition)) {
        
        this.individualMachine = {}
        this.individualMachine = machine;

      }

      this.lastOneMachine = machine.lastDivition;


    });
  }

  

}
