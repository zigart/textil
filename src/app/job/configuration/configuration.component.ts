import { Component, ViewChild, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { machine } from 'src/app/models/machine.model';
import { LoginService } from 'src/app/services/config/login.service';
import { LoginGuard } from './login.guard';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild('layoutMachines') layoutMachines!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('login') login!: ElementRef;
  @ViewChild('machineCfg') machineCfg!:ElementRef;
  @ViewChild('layoutWorkers') layoutWorkers!:ElementRef;
  @ViewChild('workersCfg') workersCfg!:ElementRef;
  
  public password!:string;
  public loged:boolean;
  private loginSubscription:Subscription = new Subscription();


  constructor(
    private router: Router, 
    private activatedRouter:ActivatedRoute, 
    private render:Renderer2,
    private loginService: LoginService,
    private loginGuard: LoginGuard) { 
    this.loged = false;

  }
  
  ngOnInit(): void {
  }
  
  
  ngOnDestroy(): void {
   this.loginSubscription.unsubscribe();
  }
  
  signIn(){

    //the password its taken from two way data binding
    this.loginGuard.getData(this.password);

    this.loginService.loged.subscribe(
      (response)=>{
        this.loged = response;
      },
      (error)=>{
        console.log(error);
      }
    );

    //i must fix this, if I click on attandand next to login this is not showing again
    if (this.loged == true) {
      this.router.navigate(['maquinas'], {relativeTo: this.activatedRouter});
      this.render.setStyle(this.login.nativeElement, 'display', 'none');
    }
  }

}
