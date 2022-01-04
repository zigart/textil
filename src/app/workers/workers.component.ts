import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/config/login.service';
import { dataService } from '../services/data.service';
import { WorkersService } from '../services/workers/workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit, OnDestroy {
  public workers:Array<any>;
  private listSubscription:Subscription = new Subscription();

  constructor(
    private router:Router, 
    private dataService: dataService, 
    private workersServices: WorkersService,
    private loginService:LoginService ) {
    this.workers = [];
  }
  
  ngOnInit(): void {
    this.getWorker();
  }
 
  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
  
  getWorker(){
   this.listSubscription =  this.workersServices.workersList.subscribe(
      (response) =>{
        this.workers = response;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  redirectAttendant(){
    this.loginService.showLogin = true;
    this.router.navigate(['/inicio/configuracion']);
  }

  redirectWorker(){
    this.router.navigate(['/inicio/trabajo']);
  }

}
