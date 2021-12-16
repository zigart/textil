import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

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
  
  constructor(private router: Router) { 
    this.password = '';
    this.truePassword = "panichella";
    this.displayLayout = false;
    this.machineNumb = 0;
  }
  
  ngOnInit(): void {
  }
  
  signIn(){
    let login = document.getElementById('login');
    let layout = document.getElementById('layout');
    if (this.password === this.truePassword) {
      if(login && layout){
        login.style.display = "none";
        layout.style.display = "block";
      }
    }
  }
  
  
  
  displayOrNotLayout(){
    let layout = document.getElementById('layout');
    let machineCfg = document.getElementById('machineCfg');
    if (this.displayLayout === true && layout && machineCfg) {
      layout.style.display = 'block';
      machineCfg.style.display = 'none';
    }else if (layout && machineCfg) {
      layout.style.display = 'none';
      machineCfg.style.display = 'block';
    }{
    }
  }


  machineNumber(value:number){
    this.machineNumb = value;
    
  }
  
  
}
