import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { machine } from 'src/app/models/machine.model';
import { dataService } from 'src/app/services/data.service';

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
  public machineID!:string
  private getMachineSubscription: Subscription = new Subscription();
  public machine:any;
  
  constructor(private route:ActivatedRoute, private render:Renderer2,
    private dataService:dataService) { 
    //initializations
    this.review = false;  
    this.newDate = ""; // two way data binding
    this.reviewDate = "";
    this.toModify;
    //------------------------------------------------------------
    let routerActiv:any = this.route.snapshot.paramMap.get('machine');
    this.numberMachine = routerActiv;
  }

  ngOnInit(): void {
    this.getMachine();
  }


  getMachine(){
    this.machineID = this.route.snapshot.params['id'];

    this.getMachineSubscription = this.dataService.getMachine(this.machineID).subscribe(
      response =>{
        this.machine = response;
        console.log(this.machine);
      }
    )

  }

  //this function find the html element when somebody click the button
   editForm(e:any){
    let paragraph = e.path[1].childNodes[0];
    this.toModify = paragraph;

    //FIX THIS URGENT
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
  
}
