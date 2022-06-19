import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/config/login.service';
import { LoginGuard } from './login.guard';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  @ViewChild('login') login!: ElementRef;
  
  public password!:string;
  private loginSubscription:Subscription = new Subscription();
  public loginForm!:FormGroup;

  constructor(
    private router: Router, 
    private activatedRouter:ActivatedRoute, 
    private render:Renderer2,
    private loginService: LoginService,
    private loginGuard: LoginGuard,
    private datePipe: DatePipe) { 

      this.buildForm();

  }
  
  ngOnInit(): void {
  }
  
  
  ngOnDestroy(): void {
   this.loginSubscription.unsubscribe();
  }
  
  signIn(event:Event){
    event.preventDefault();
    const value = this.loginForm.value

    //the password is taken from two way data binding
    this.loginGuard.getData(value.passwordTyped);

    this.loginService.loged.subscribe(
      (response)=>{
        this.loginService.logedChild = response;
      },
      (error)=>{
        console.log(error);
      }
    );

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


   private buildForm(){
    this.loginForm = new FormGroup({
      passwordTyped: new FormControl('', [Validators.required])
    });
  }
  
   get passwords(){return this.loginForm.get('passwordTyped')}
}
