import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { dataService } from '../services/data.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit, OnDestroy {
  public workers:Array<any>;
  private listSubscription:Subscription = new Subscription();

  constructor(private router:Router, private dataService: dataService ) {
    this.workers = [];
  }
  
  ngOnInit(): void {
    this.getWorker();
  }
 
  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
  
  getWorker(){
   this.listSubscription =  this.dataService.workersList.subscribe(
      (response) =>{
        this.workers = response;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  redirect(){
    this.router.navigate(['/inicio/configuracion']);
  }

}
