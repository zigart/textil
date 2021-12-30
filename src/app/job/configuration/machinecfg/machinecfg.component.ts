import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { machine } from 'src/app/models/machine.model';

@Component({
  selector: 'app-machinecfg',
  templateUrl: './machinecfg.component.html',
  styleUrls: ['./machinecfg.component.scss']
})
export class MachinecfgComponent implements OnInit {

  @ViewChild('form') form!:ElementRef;

  public numberMachine:number;
  public date =  Date.now();
  public review: boolean;
  public newDate:string;
  public reviewDate:string;
  private toModify:any;
  
  constructor(private routerAct:ActivatedRoute, private render:Renderer2) { 
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
  }

  @Input() number!:machine;

  //this function find the html element when somebody click the button
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
    if(window.confirm('Esta informacion sera irrecuperable')){
      if (this.toModify) {
        this.toModify.innerText = "ultima revision:" + this.newDate;
        this.render.setStyle(this.form.nativeElement, 'display', 'none');
      }
    }
  }

  cancel(){
    this.render.setStyle(this.form.nativeElement, 'display', 'none');
  }
  
  @Output() clicked = new EventEmitter<boolean>();

  back(){
    this.clicked.emit(true);
  }
}
