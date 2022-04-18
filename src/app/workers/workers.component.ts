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
  public workers:Array<any> = [];
  private listSubscription:Subscription = new Subscription();

  constructor(
    private router:Router, 
    private dataService: dataService, 
    private workersServices: WorkersService,
    private loginService:LoginService ) {}
  
  ngOnInit(): void {
    this.getWorker();
  }
 
  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
  
  getWorker(){
   this.listSubscription =  this.workersServices.workersList.subscribe(
      response => {
        this.workers = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  assignWorker(worker:any){
    this.workersServices.getWorker(worker);
    this.dataService.getWorker(worker).subscribe(
      response => this.loginService.worker = response
    );
    this.loginService.showLoginWorker = true;
  }

  redirectAttendant(){
    this.router.navigate(['/inicio/configuracion'])
    this.loginService.showLogin = true;
  }


}
