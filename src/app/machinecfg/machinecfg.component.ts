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
  public newDate:string;
  public reviewDate:string;

  private toModify:any;

  constructor(private routerAct:ActivatedRoute) { 
    //initializations
    this.review = false;  
    this.newDate = ""; // two way data binding
    this.reviewDate = "";
    this.toModify;
    //------------------------------------------------------------
    let routerActiv:any = this.routerAct.snapshot.paramMap.get('machine');
    this.numberMachine = routerActiv;
  }

  ngOnInit(): void {
    console.log();
  }


  //this function find the html element when somebady click the button
   editForm(e:any){
    let paragraph = e.path[1].childNodes[0];
    this.toModify = paragraph;
    let form = document.getElementById('form');
    if (form) {
      form.style.display = "block";
    }
  }

  //button for final edit 
  edit(){
    let form = document.getElementById('form');
    if (this.toModify && form) {
      this.toModify.innerText = "ultima revision:" + this.newDate;
      form.style.display = "none";
    }

  }
}
