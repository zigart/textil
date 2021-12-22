import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    console.log(this.dataService.workers);
  }

}
