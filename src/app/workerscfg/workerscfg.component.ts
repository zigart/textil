import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit {

  public workers: Array<string>;
  public newWorker: string;

  constructor(private dataService:DataService) {
    this.workers = [];
    this.newWorker = '';
   }

  ngOnInit(): void {
    this.workers = this.dataService.workers;
  }

  addWorker(){
    let form = document.getElementById('addNewWorker');
    if (form) {
      form.style.display = "flex";
    }
  }

  add(){
    console.log(this.newWorker);
    this.workers.push(this.newWorker);
    this.newWorker = "";
    let form = document.getElementById('addNewWorker');

    if (form) {
      form.style.display= "none";
    }
  }

}
