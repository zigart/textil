import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { machine } from 'src/app/models/machine.model';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-machinecfg',
  templateUrl: './machinecfg.component.html',
  styleUrls: ['./machinecfg.component.scss']
})
export class MachinecfgComponent implements OnInit, OnDestroy {

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
  private updateSubscribe:Subscription = new Subscription();
  public valueToEdit!:string;
  
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
  
  @ViewChild('activeMachine') activeMachine!:ElementRef;
  ngOnInit(): void {
    this.getMachine();
  }
  
  ngOnDestroy(): void {
    this.updateSubscribe.unsubscribe();
    this.getMachineSubscription.unsubscribe();
  }
  
  getMachine(){
    this.machineID = this.route.snapshot.params['id'];
    
    this.getMachineSubscription = this.dataService.getMachine(this.machineID).subscribe(
      response =>{
        this.machine = response;
        console.log(this.machine.lastReview);
      });

  }


  changeState(e:any){
    this.machine.activeMachine = e.target.checked;
    this.updateSubscribe= this.dataService.updateActiveMachine(this.machine._id, this.machine).subscribe(
      (response)=>{},
      (error)=>{
        console.log(error);
      }
    )
  }
  //this function find the html element when somebody click the button
   editForm(value:string){
    this.valueToEdit = value;

    if(this.valueToEdit == 'review'){
      this.newDate = this.machine.lastReview;
    }else{
      this.newDate = this.machine.lastDivition;
    }
    
    this.render.setStyle(this.form.nativeElement, 'display', 'flex');
  }

  //button for final edit 
  edit(){

    console.log(this.machine);

    

    if(window.confirm('Esta informacion sera irrecuperable')){

      if(this.valueToEdit == 'review'){
        this.machine.lastReview = this.newDate;
      }else{
        this.machine.lastDivition = this.newDate;
      }
      this.dataService.updateActiveMachine(this.machineID, this.machine).subscribe()
      this.render.setStyle(this.form.nativeElement, 'display', 'none');
    }
  }

  cancel(){
    this.render.setStyle(this.form.nativeElement, 'display', 'none');
  }
  
}
