import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';
import { DivideService } from 'src/app/services/divide/divide.service';
import { MachineService } from 'src/app/services/machine/machine.service';
import { currentWork } from '../../models/current-work.model';
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

  @ViewChild('start') start!:ElementRef;
  @ViewChild('finish') finish!:ElementRef;

  public workerID!:string;
  public worker:any;
  private updateSubscription:Subscription = new Subscription();
  private machines:Array<object> = this.divideService.machines;
  public lastOneMachine:string = this.divideService.lastOneMachine;
  public individualMachine:any;


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
  ) {}
      
      
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
        
        this.workerID = this.activeRoute.snapshot.params['id'];
       
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
      
      /**
   * @function startCount
   * 
   * @description Refresh date in the 'lastDivide' in the worker obtained by id in the url worker
   * 
   * @example 
   * this.worker.lastDivition = 2021-01-01T00:00:00.000-03:00, after click this date
   * its updated to current date
   * also hides the start button and show the finish button
   * 
   * @returns update with current date of the worker
   * @memberof DivideComponent
   */
   startCount(){
     this.worker.lastDivition = DateTime.now().toString();
     
     this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe();
        this.render.setStyle(this.start.nativeElement, 'display', 'none');
        this.render.setStyle(this.finish.nativeElement, 'display', 'block');
  }


/**
 * @function finishCount
 *  
 * @description Refresh date of the machine obtained by function getMachineToDivide executed in the onInit 
 * 
 * @example getMachineToDivide return the machine 1 with lastDivition value: 2021-01-01T00:00:00.000-03:00
 * when someone clicks the button, get the current date and replace this value
 * 
 * @returns update with current date of the machine.lastDivition
 * 
 * @memberof DivideComponent
 */
finishCount(){
  this.individualMachine.lastDivition = DateTime.now().toString();
  this.dataService.updateActiveMachine(this.individualMachine._id, this.individualMachine).subscribe();
  this.dataService.deleteCurrentWork(this.workerID).subscribe();
    this.render.setStyle(this.start.nativeElement, 'display', 'block');
    this.render.setStyle(this.finish.nativeElement, 'display', 'none');
    this.router.navigate(['inicio/trabajo/', this.workerID]);
  }



/**
 * @function getMachineToDivide 
 * 
 * @description 
 * with luxon im comparing the dates, if the machine has the most recent date this function save the
 * machine in individualMachine object
 * 
 * @returns return the oldest machine
 * 
 * @memberof DivideComponent
 */


}
