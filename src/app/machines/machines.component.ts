import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  public machines: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  private password:string = "maquinas";
  constructor() { 
  }

  ngOnInit(): void {
  }

  addMachine() {
    let lastItem = this.machines[this.machines.length - 1];
    let newItem = lastItem + 1;
    this.machines.push(newItem);
  }
}
