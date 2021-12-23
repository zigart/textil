import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../services/Data.service';

@Component({
  selector: 'app-layoutworkers',
  templateUrl: './layoutworkers.component.html',
  styleUrls: ['./layoutworkers.component.scss']
})
export class LayoutworkersComponent implements OnInit {

  public workers: Array<string>;
  public newWorker: string;

  constructor(private dataService:DataService) {
    this.workers = this.dataService.workers;
    this.newWorker = '';
   }

  ngOnInit(): void {
    this.dataService.workers = this.workers;
  }

  addWorker(){
    let form = document.getElementById('addNewWorker');
    if (form) {
      form.style.display = "flex";
    }
  }

  add(){
    this.workers.push(this.newWorker);
    this.dataService.workers = this.workers;
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
