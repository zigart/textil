import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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

  @ViewChild('login') login!: ElementRef;
  
  public password!:string;
  public loged:boolean;
  private loginSubscription:Subscription = new Subscription();
  today:any;

  constructor(
    private router: Router, 
    private activatedRouter:ActivatedRoute, 
    private render:Renderer2,
    private loginService: LoginService,
    private loginGuard: LoginGuard,
    private datePipe: DatePipe) { 
    this.loged = false;
    this.today = moment(Date.now(), 'DD/MM/yyyy, HH:mm');

  }
  
  ngOnInit(): void {
    console.log(this.today);
  }
  
  
  ngOnDestroy(): void {
   this.loginSubscription.unsubscribe();
  }
  
  signIn(){

    //the password its taken from two way data binding
    this.loginGuard.getData(this.password);

    this.loginService.loged.subscribe(
      (response)=>{
        this.loginService.logedChild = response;
      },
      (error)=>{
        console.log(error);
      }
    );

    //i must fix this, if I click on attandand next to login this is not showing again
    if (this.loginService.logedChild == true) {
      this.router.navigate(['maquinas'], {relativeTo: this.activatedRouter});
      this.loginService.showLogin = false;

  }
  this.password = "";
}


   displayOrNot(){
     if (this.loginService.showLogin === true) {
       return 'flex'; 
     }else{
       return 'none';
     }
   }
}
