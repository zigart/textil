import { Component, ViewChild, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { machine } from 'src/app/models/machine.model';
import { LoginService } from 'src/app/services/config/login.service';
import { LoginGuard } from './login.guard';

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
  public machineNumb!:machine;
  public workerName:string;
  public workerID:string;
  
  private execWorkerCfg: boolean;

  constructor(
    private router: Router, 
    private activatedRouter:ActivatedRoute, 
    private render:Renderer2,
    private loginService: LoginService,
    private loginGuard: LoginGuard) { 
    this.password = '';
    this.truePassword = "";
    this.displayLayout = false;
    this.workerName = '';
    this.workerID = '';
    this.execWorkerCfg = false;

  }
  
  ngOnInit(): void {
  }
  
 
  
  signIn(){

    this.loginGuard.getData(this.password)

    if (this.loginService.loged) {
      this.router.navigate(['maquinas'], {relativeTo: this.activatedRouter});
       this.render.setStyle(this.login.nativeElement, 'display', 'none');
      // this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'flex');
       this.render.setStyle(this.nav.nativeElement, 'display', 'flex');
    }else{
      this.render.setStyle(this.nav.nativeElement, 'display', 'none');
    }
  }
  
  
  
  displayOrNotLayoutMachines(){
    // if (this.displayLayout === true) {
    //   this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'flex');
    //   this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
    // }else{
    //   this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'none');
    //   this.render.setStyle(this.machineCfg.nativeElement, 'display', 'block');
    // }{
    // }
  }



  machineNumber(value:machine){
    this.machineNumb = value;
    
  }
  
  getBackFromMachineCfg(e:boolean){

    if ( e === true) {
      this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
      this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'block');
    }
  }
  

  showWorkersCfg(){
    this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'block');
    this.render.setStyle(this.layoutMachines.nativeElement, 'display', 'none');
    this.render.setStyle(this.machineCfg.nativeElement, 'display', 'none');
    this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none');
}

  getNameWorker(name:string){
    this.workerName = name;
  }

  getWorkerID(id:string){
    this.workerID = id;
  }



  getBackFromWorkersCfg(e:boolean){
    if ( e === true) {
      this.render.setStyle(this.workersCfg.nativeElement, 'display', 'none'); 
      this.render.setStyle(this.layoutWorkers.nativeElement, 'display', 'block');
    }
  }


  execSub(event:any){
    console.log(event);
  }
}
