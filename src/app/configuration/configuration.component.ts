import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  
  public password:string;
  private truePassword:string;
  public displayLayout:boolean;
  public machineNumb:number;
  public workerName:string;
  
  constructor(private router: Router) { 
    this.password = '';
    this.truePassword = "";
    this.displayLayout = false;
    this.machineNumb = 0;
    this.workerName = '';

  }
  
  ngOnInit(): void {
  }
  
  signIn(){
    var layoutMachines = document.getElementById('layoutMachines');
    let login = document.getElementById('login');
    let nav = document.getElementById('nav');
    if (this.password === this.truePassword) {
      if(login && layoutMachines && nav){
        login.style.display = "none";
        layoutMachines.style.display = "block";
        nav.style.display = "block";
      }
    }
  }
  
  
  
  displayOrNotLayoutMachines(){
    let layoutMachines = document.getElementById('layoutMachines');
    let machineCfg = document.getElementById('machineCfg');
    if (this.displayLayout === true && layoutMachines && machineCfg) {
      layoutMachines.style.display = 'block';
      machineCfg.style.display = 'none';
    }else if (layoutMachines && machineCfg) {
      layoutMachines.style.display = 'none';
      machineCfg.style.display = 'block';
    }{
    }
  }



  machineNumber(value:number){
    this.machineNumb = value;
    
  }
  
  getBackFromMachineCfg(e:boolean){
    let machineCfg = document.getElementById('machineCfg');
    let layoutMachines = document.getElementById('layoutMachines');
    if ( e === true && machineCfg && layoutMachines) {
      machineCfg.style.display = "none";
      layoutMachines.style.display = "block";
    }
  }
  
  showMachinesLayout(){
    let layoutMachines = document.getElementById('layoutMachines');
    let layoutWorkers = document.getElementById('layoutWorkers');
    let machineCfg = document.getElementById('machineCfg');
    let workersCfg = document.getElementById('workersCfg');
    if (layoutMachines && layoutWorkers && machineCfg && workersCfg) {
      layoutMachines.style.display = "block";
      layoutWorkers.style.display = "none";
      machineCfg.style.display = 'none';
      workersCfg.style.display = 'none';
    }

  }
  showWorkersCfg(){
    let layoutMachines = document.getElementById('layoutMachines');
    let layoutWorkers = document.getElementById('layoutWorkers');
    let machineCfg = document.getElementById('machineCfg');
    let workersCfg = document.getElementById('workersCfg');
    if (layoutMachines && layoutWorkers && machineCfg && workersCfg) {
      layoutMachines.style.display = "none";
      layoutWorkers.style.display = "block";
      machineCfg.style.display = 'none';
      workersCfg.style.display = 'none';
  }
}

  GetNameWorker(name:string){
    this.workerName = name;
  }


  displayOrNotLayoutWorkers(event:boolean){
    let layoutWorkers = document.getElementById('layoutWorkers');
    let workersCfg = document.getElementById('workersCfg');
    
    if (event === true && layoutWorkers && workersCfg) {
      layoutWorkers.style.display = 'block';
      workersCfg.style.display = 'none';
    }else if (layoutWorkers && workersCfg) {
      layoutWorkers.style.display = 'none';
      workersCfg.style.display = 'block';
      
    }{
    }
  }

  getBackFromWorkersCfg(e:boolean){
    let workersCfg = document.getElementById('workersCfg');
    let layoutWorkers = document.getElementById('layoutWorkers');
    if ( e === true && workersCfg && layoutWorkers) {
      workersCfg.style.display = "none";
      layoutWorkers.style.display = "block";
    }
  }
}
