import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { machine } from 'src/app/models/machine.model';
import { dataService } from 'src/app/services/data.service';
import { MachineService } from 'src/app/services/machine/machine.service';

@Component({
  selector: 'app-layoutmachine',
  templateUrl: './layoutmachine.component.html',
  styleUrls: ['./layoutmachine.component.scss']
})
export class LayoutmachineComponent implements OnInit, OnDestroy {
  public machines: Array<any>;
  private getMachinesSubscription:Subscription = new Subscription();
  private newSubscription: Subscription = new Subscription();

  @Output() machineNumber = new EventEmitter<machine>();
  @Output() displayLayoutMachine = new EventEmitter<boolean>();

  constructor(
    private machineService:MachineService,
    private dataService: dataService) { 
      this.machines = [];
    }

  ngOnInit(): void {
    this.getMachines();
  }

  ngOnDestroy(): void {
      this.getMachinesSubscription.unsubscribe();
  }

  getMachines(){
   this.getMachinesSubscription = this.machineService.machineList.subscribe(
      (response) =>{
        this.machines = response;
        console.log(this.machines);
      },
      (error)=>{
        console.log(error);
      });
  }


  addMachine() {
    let lastItem = this.machines[this.machines.length - 1];
    let sum = lastItem.machineNumber + 1;
    let newMachine = new machine(sum, true);
    this.newSubscription = this.dataService.addMachine(newMachine)
    .pipe(concatMap(machines => this.dataService.getMachines()))
    .subscribe(
      (response)=>{
        this.machineService.machineList.next(response);
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  redirect(machine:machine){
    this.machineNumber.emit(machine);
    this.displayLayoutMachine.emit(false);
  }
}
