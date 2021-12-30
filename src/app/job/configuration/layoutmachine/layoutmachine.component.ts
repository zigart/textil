import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/services/machine/machine.service';

@Component({
  selector: 'app-layoutmachine',
  templateUrl: './layoutmachine.component.html',
  styleUrls: ['./layoutmachine.component.scss']
})
export class LayoutmachineComponent implements OnInit {
  public machines: Array<any>;

  @Output() machineNumber = new EventEmitter<machine>();
  @Output() displayLayoutMachine = new EventEmitter<boolean>();

  constructor(
    private machineService:MachineService) { 
      this.machines = [];
    }

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines(){
    this.machineService.machineList.subscribe(
      (response) =>{
        this.machines = response;
        console.log(this.machines);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  addMachine() {
    let lastItem = this.machines[this.machines.length - 1];
    // let newItem = lastItem + 1;
    // this.machines.push(newItem);
  }

  redirect(machine:machine){
    this.machineNumber.emit(machine);
    this.displayLayoutMachine.emit(false);
  }
}
