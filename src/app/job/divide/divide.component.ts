import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { DivideService } from 'src/app/services/divide/divide.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { currentWork } from '../../models/current-work.model';
import { divide } from 'src/app/models/divide.model';
import { worker } from 'src/app/models/worker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * this component asign a machine to divide and update the dates
 *
 * @export
 * @class DivideComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-divide',
  templateUrl: './divide.component.html',
  styleUrls: ['./divide.component.scss']
})
export class DivideComponent implements OnInit {

  @ViewChild('startView') startView!:ElementRef;
  @ViewChild('finish') finish!:ElementRef;
  @ViewChild('send') send!:ElementRef;

  public workerID!:string;
  public worker!:worker;
  private updateSubscription:Subscription = new Subscription();
  private machines:Array<object> = this.divideService.machines;
  public lastOneMachine:string = this.divideService.lastOneMachine;
  public individualMachine:any;
  public divideDataForm!: FormGroup;


  

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

  /**
   * Creates an instance of DivideComponent.
   * @param {Renderer2} render
   * @param {ActivatedRoute} activeRoute
   * @param {dataService} dataService
   * @param {MachineService} machineService
   * @memberof DivideComponent
   */

  constructor(
    private render:Renderer2,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private dataService: dataService,
    private machineService:MachineService,
    private divideService: DivideService
  ) {
    this.buildForm();
  }
      
      
      /**
       * get the worker id from url, after subscribe to two subscribers:
       * first to observable machineList, this observable return all machines and save it in 'machines'
       * second to observable getWorker, this observable return the worker specified by id
       * @param workerID
       * finally run the getMachineToDivide
       * 
       * @memberof DivideComponent
       */
      
      //FIXME: i need refresh individualMachine when you return to this component
      ngOnInit(): void {
        
        this.workerID = this.activeRoute.parent?.snapshot.params['id'];
          this.dataService.getWorker(this.workerID).subscribe(
            (response)=>{
              this.worker = response;
        }, 
        (error)=>{
          console.log(error);
        });

        this.divideService.workerID = this.workerID;
        this.divideService.getMachineToDivide();
        
        this.divideService.individualMachine2.subscribe(
          response => {
            this.individualMachineObtained = response;
          });

        this.dataService.getCurrentWork(this.workerID).subscribe(
          response => {
            this.individualMachine = response.machine;
            this.individualMachine.lastDivition = DateTime.now().toString();
            this.dataService.updateActiveMachine(response.machine._id, response.machine).subscribe();
            
          },
          error => {
            this.individualMachine = this.individualMachineObtained;
            this.individualMachine.lastDivition = DateTime.now().toString();
            this.dataService.updateActiveMachine(this.individualMachineObtained._id, this.individualMachineObtained).subscribe();
            }
          );
      }

 start(){

  this.render.setStyle(this.startView.nativeElement, 'display', 'none');
  this.render.setStyle(this.send.nativeElement, 'display', 'flex');

  this.worker.lastReview = DateTime.now().toString();
  this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe();
  
  
}

private buildForm(){
  this.divideDataForm = new FormGroup({
    colth: new FormControl('', [Validators.required]),
    failed:new FormControl('', [Validators.required])
  });
}

saveDivideData(event:Event){
  event.preventDefault();
  const value = this.divideDataForm.value;
 
   this.individualMachine.lastReview = DateTime.now().toString();
   this.dataService.updateActiveMachine(this.individualMachineObtained._id, this.individualMachineObtained).subscribe();
   this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();
   
   let divideForm = new divide('divide', this.worker, this.individualMachine, DateTime.now().toString(), value.colth, value.failed )
 
 
   this.dataService.sendDivideForm(divideForm).subscribe();
   this.dataService.deleteCurrentWork(this.workerID).subscribe();
 
   this.worker.lastWork = 'divide';
   this.dataService.updateWorker2(this.workerID, this.worker).subscribe();
 
 
   this.router.navigate(['inicio/password/' + this.workerID + '/trabajo']);
}

  
}
