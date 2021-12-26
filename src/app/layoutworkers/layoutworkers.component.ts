import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../services/Data.service';
import {  worker } from '../models/worker.model';

@Component({
  selector: 'app-layoutworkers',
  templateUrl: './layoutworkers.component.html',
  styleUrls: ['./layoutworkers.component.scss']
})
export class LayoutworkersComponent implements OnInit {

  public workers: Array<any>;
  public newWorker: string;

  constructor(private dataService:DataService) {
    this.workers = this.dataService.workers;
    this.newWorker = '';
   }

  ngOnInit(): void {
    this.getWorker();
  }

  //this function return a object and i need a string with his name. Fix it
  getWorker(){
    this.dataService.getWorkers().subscribe(
      (response) =>{
        this.workers = response.worker
        this.workers;
      },
      (error) =>{
        console.log(error);
      }
    )
  }


  addWorker(){
    let form = document.getElementById('addNewWorker');
    if (form) {
      form.style.display = "flex";
    }
  }

  add(){
    let newWorker = new worker(this.newWorker, 'true', 'true', 'hoy 12:30', 'hoy 12:33');
    this.dataService.addWorker(newWorker).subscribe(
      response =>{
        console.log(response);
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
