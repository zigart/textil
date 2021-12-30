import { Component, ViewChild, OnInit, ElementRef, Renderer2, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  @ViewChild('layoutMachines') layoutMachines!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('login') login!: ElementRef;
  @ViewChild('machineCfg') machineCfg!:ElementRef;
  @ViewChild('layoutWorkers') layoutWorkers!:ElementRef;
  @ViewChild('workersCfg') workersCfg!:ElementRef;
  
  public password:string;
  private truePassword:string;
  public displayLayout:boolean;
  public machineNumb:number;
  public workerName:string;
  

  constructor(private router: Router, private render:Renderer2) { 
    this.password = '';
    this.truePassword = "";
    this.displayLayout = false;
    this.machineNumb = 0;
    this.workerName = '';

  }
  
  ngOnInit(): void {
  }
  
 
  
  signIn(){
    if (this.password === this.truePassword) {
      this.render.setStyle(this.login.nativeElement, 'display', 'none');
      this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'flex');
      this.render.setStyle(this.nav.nativeElement, 'display', 'flex');
    }
  }
  
  
  
  displayOrNotLayoutMachines(){
    if (this.displayLayout === true) {
      this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'flex');
      this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
    }else{
      this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'none');
      this.render.setStyle(this.machineCfg.nativeElement, 'display', 'block');
    }{
    }
  }



  machineNumber(value:number){
    this.machineNumb = value;
    
  }
  
  getBackFromMachineCfg(e:boolean){

    if ( e === true) {
      this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
      this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'block');
    }
  }
  
  showMachinesLayout(){
    this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'block');
    this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'none');
    this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
    this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none');
    }

  showWorkersCfg(){
    this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'block');
    this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'none');
    this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
    this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none');
}

  GetNameWorker(name:string){
    this.workerName = name;
  }


  displayOrNotLayoutWorkers(event:boolean){
    if (event === true){
      this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'block');
      this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none');
    }else{
      this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'none');
      this.render.setStyle(this.workersCfg.nativeElement, 'display', 'block');  
    }
  }

  getBackFromWorkersCfg(e:boolean){
    if ( e === true) {
      this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none'); 
      this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'block');
    }
  }
}
