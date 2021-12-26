import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/Data.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers:Array<object>;

  constructor(private router:Router, private DataService: DataService ) {
    this.workers = this.DataService.workers;

  }
  
  
  ngOnInit(): void {}
 
  redirect(){
    this.router.navigate(['/inicio/configuracion']);
  }

}
