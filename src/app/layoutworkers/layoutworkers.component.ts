import { Component, EventEmitter, OnInit, OnDestroy ,Output } from '@angular/core';
import { dataService } from '../services/data.service';
import {  worker } from '../models/worker.model';
import { of, Subscription } from 'rxjs'
import { concatMap } from 'rxjs/operators'
@Component({
  selector: 'app-layoutworkers',
  templateUrl: './layoutworkers.component.html',
  styleUrls: ['./layoutworkers.component.scss']
})
export class LayoutworkersComponent implements OnInit, OnDestroy {

 
  public workers: Array<any>;
  public newWorker: string;
  private listSubscription: Subscription = new Subscription();
  private newSubscription: Subscription = new Subscription();

  constructor(private dataService:dataService) {
    this.workers = [];
    this.newWorker = '';
   }
   
   
   ngOnInit(): void {
     this.getWorker();
    }
    
    ngOnDestroy(): void {
      this.listSubscription.unsubscribe();
      this.newSubscription.unsubscribe();
    }
  

  getWorker(){
   this.listSubscription =  this.dataService.workersList.subscribe(
      (response) =>{
        this.workers = response;
        
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  //viewchild
  addWorker(){
    let form = document.getElementById('addNewWorker');
    if (form) {
      form.style.display = "flex";
    }
  }

   add(){
    let newWorker = new worker(this.newWorker, 'true', 'true', 'hoy 12:30', 'hoy 12:33');

    this.newSubscription = this.dataService.addWorker(newWorker)
    .pipe(concatMap(worker => this.dataService.getWorkers()))
    .subscribe(
      response =>{
        this.dataService.workersList.next(response);
      }, error =>{
        console.log(error);
      }
    );
    this.newWorker = "";
    let form = document.getElementById('addNewWorker');
    if (form) {
      form.style.display= "none";
    }
  }

  @Output() nameWorker = new EventEmitter<string>();
  @Output() displayLayoutWorkers = new EventEmitter<boolean>();

  redirect(worker:string){
    this.nameWorker.emit(worker);
    this.displayLayoutWorkers.emit(false);
  }
}
