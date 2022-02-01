import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { dataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  public machines:Array<object> = [];
  
  public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';
  
  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
  }
  
  public individualMachine2: Subject<object> = new Subject<object>();

constructor(
  private dataService: dataService
) { }


getMachineToReview(){

 this.dataService.getMachines().subscribe(
   (response)=>{
     this.machines = response;
     this.getMachine(response);
     
   }
 );

}


getMachine(machines:any){
  
machines.forEach((machine:any) =>{
  
  if (this.individualMachine.machineNumber === 0) {
    this.individualMachine = machine;
  }
  



  /*this conditional verify if the machine is active and if its the oldest machine. if isn't active it 
  generates a problem, to resolve this i asign a future value to individualmachine and the logic continue. 
  this solution its provisory because its inefficient*/


  if(machine.activeMachine){
    
    if ( DateTime.fromISO(machine.lastReview) < DateTime.fromISO(this.lastOneMachine) 
    && DateTime.fromISO(machine.lastReview) < DateTime.fromISO(this.individualMachine.lastReview)) {
      
      this.individualMachine = {}
      this.individualMachine = machine;

    }
    this.lastOneMachine = machine.lastReview;


    //queda guardado el valor del 2200 erroneamente
  }else if(!machine.activeMachine && machine._id == this.individualMachine._id ){
    this.individualMachine.lastReview = '2200-01-01T00:00:00.000-03:00'
  }
  
  this.individualMachine2.next(this.individualMachine);
}
);
}}
