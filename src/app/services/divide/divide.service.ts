import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, concat, } from 'rxjs';
import { DateTime } from 'luxon';
import { MachineService } from '../machine/machine.service';
import { dataService } from '../data.service';
import { concatMap, map  } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DivideService {

  public machines:Array<object> = [];

  public lastOneMachine:string = '2021-01-01T00:00:00.000-03:00';

  public individualMachine:any =  {
    _id: '',
    machineNumber: 0,
    lastDivition: '2021-01-01T00:00:00.000-03:00',
    lastReview: '2021-01-01T00:00:00.000-03:00'
  }

  public individualMachine2: Subject<object> = new Subject<object>();
constructor(private dataService:dataService) {}





  getMachineToDivide(){

   this.dataService.getMachines().subscribe(
     (response)=>{
       this.machines = response;
       console.log(this.machines);
       this.getMachine(response);
       
     }
   );

}
getMachine(machines:any){
    
  machines.forEach((machine:any) =>{
    
    console.log('deberia ser el segundo e iterar')
    
    if (this.individualMachine.machineNumber === 0) {
      this.individualMachine = machine;
      console.log ('se le asigna ' + this.individualMachine);
    }
    

    console.log(this.individualMachine.lastDivition, ' ', machine.lastDivition);
    


    /*this conditional verify if the machine is active and if its the oldest machine. if isn't active it 
    generates a problem, to resolve this i asign a future value to individualmachine and the logic continue. 
    this solution its provisory because its inefficient*/
    if(machine.activeMachine){
      
      if ( DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.lastOneMachine) 
      && DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.individualMachine.lastDivition)) {
        
        console.log('paso la prueba', machine);
        this.individualMachine = {}
        this.individualMachine = machine;

        console.log(machine);
      }
      this.lastOneMachine = machine.lastDivition;
    }else if(!machine.activeMachine && machine.id == this.individualMachine.id ){
      this.individualMachine.lastDivition = '2200-01-01T00:00:00.000-03:00'
    }
    
    this.individualMachine2.next(this.individualMachine);
  }
  );
  console.log(this.individualMachine);
}
}

