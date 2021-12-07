import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machinecfg',
  templateUrl: './machinecfg.component.html',
  styleUrls: ['./machinecfg.component.scss']
})
export class MachinecfgComponent implements OnInit {
  public numberMachine:number;
  public date =  Date.now();
  public review: boolean;

  constructor(private routerAct:ActivatedRoute) { 
    let routerActiv:any = this.routerAct.snapshot.paramMap.get('machine');
    this.numberMachine = routerActiv;
    this.review = false;  
  }

  ngOnInit(): void {
    console.log();
  }


  editReview(){
    let formReview = document.getElementsByClassName('separate');
    if (this.review === false) {
      this.review = true;
    }else{
      this.review = false
    }
  }
  editDivide(){}
}
