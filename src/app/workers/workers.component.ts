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
  
    /**
     * @function ngOnInit
     * call to getworker function
     */
  ngOnInit(): void {
    this.getWorker();
  }
 
  /**
   * @function ngOnDestroy
   * unsubscribe all
   */
  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
  

/**
 * @function getWorker
 * @returns Array with the workers list
 */

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


  /**
   * @function assignWorker
   * this function call the getworker function from dataservice and assign the value to a variable of loginservice
   * after that if the boolean "showlogin" in loginservice it's true then the login its shown
   * @param worker 
   * @returns Give the worker to the service
   */
  assignWorker(worker:string){
    this.dataService.getWorker(worker).subscribe(
      response => this.loginService.worker = response
    );
    this.loginService.showLoginWorker = true;
  }


  /**
   * @function redirectAttendant
   * redirect the attendant to his route and show the login
   * @returns redirect
   */
  redirectAttendant(){
    this.router.navigate(['/inicio/configuracion'])
    this.loginService.showLogin = true;
  }


}
