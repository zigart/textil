import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machinecfg',
  templateUrl: './machinecfg.component.html',
  styleUrls: ['./machinecfg.component.scss']
})
export class MachinecfgComponent implements OnInit {
  public numberMachine:number;
  constructor(private routerAct:ActivatedRoute) { 
    let routerActiv:any = this.routerAct.snapshot.paramMap.get('machine');
    this.numberMachine = routerActiv;
    
  }

  ngOnInit(): void {
    console.log();
  }
}
