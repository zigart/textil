import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { dataService } from '../data.service';
import { currentWork } from 'src/app/models/current-work.model';

@Injectable({
  providedIn: 'root'
})
export class DivideService {

  public workerID!: string;

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
       this.getMachine(response);
       this.dataService.getCurrentWork(this.workerID).subscribe(
         response => {},
         error=>{this.saveCurrentWork()}
       );
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
      
      if ( DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.lastOneMachine) 
      && DateTime.fromISO(machine.lastDivition) < DateTime.fromISO(this.individualMachine.lastDivition)) {
        
        this.individualMachine = {}
        this.individualMachine = machine;
      }
      this.lastOneMachine = machine.lastDivition;
    }else if(!machine.activeMachine && machine._id == this.individualMachine._id ){
      this.individualMachine.lastDivition = '2200-01-01T00:00:00.000-03:00'
    }
    
    this.individualMachine2.next(this.individualMachine);
  }
  );
}

saveCurrentWork(){
  let inProgress = new currentWork(this.workerID, "divide", this.individualMachine);
  this.dataService.saveCurrentWork(inProgress).subscribe();
}
}

