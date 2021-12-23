import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/Data.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers:Array<string>;

  constructor(private router:Router, private DataService: DataService ) {
    this.workers = this.DataService.workers;

  }
  
  
  ngOnInit(): void {

  }
  
  //i need get the info after that workerscfg send her data at the service
  
  redirect(){
    this.router.navigate(['/inicio/configuracion']);
  }

}
