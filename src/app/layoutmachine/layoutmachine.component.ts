import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layoutmachine',
  templateUrl: './layoutmachine.component.html',
  styleUrls: ['./layoutmachine.component.scss']
})
export class LayoutmachineComponent implements OnInit {
  public machines: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  private password:string = "maquinas";

  constructor(private router:Router, private routerAct:ActivatedRoute) { }

  ngOnInit(): void {
  }

  addMachine() {
    let lastItem = this.machines[this.machines.length - 1];
    let newItem = lastItem + 1;
    this.machines.push(newItem);
  }

  redirect(machine:number){
    this.router.navigate(['/inicio/configuracion/maquina/' + machine])
    
  }
}
