import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/Data.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers:Array<any>;

  constructor(private router:Router, private DataService: DataService ) {
    this.workers = [];

  }
  
  
  ngOnInit(): void {
    this.getWorker();
  }
 

  getWorker(){
    this.DataService.getWorkers().subscribe(
      (response) =>{
        this.workers = response.worker
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  redirect(){
    this.router.navigate(['/inicio/configuracion']);
  }

}
