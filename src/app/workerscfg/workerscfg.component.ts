import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from '../services/Data.service';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit {

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

}
