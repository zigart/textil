import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layoutmachine',
  templateUrl: './layoutmachine.component.html',
  styleUrls: ['./layoutmachine.component.scss']
})
export class LayoutmachineComponent implements OnInit {
  public machines: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  private booleanDisplay: boolean = false;

  @Output() machineNumber = new EventEmitter<number>();
  @Output() displayLayout = new EventEmitter<boolean>();
  constructor(private router:Router, private routerAct:ActivatedRoute) { }

  ngOnInit(): void {
  }

  addMachine() {
    let lastItem = this.machines[this.machines.length - 1];
    let newItem = lastItem + 1;
    this.machines.push(newItem);
  }

  redirect(machine:number){
    this.machineNumber.emit(machine);
    this.displayLayout.emit(false);
  }
}
