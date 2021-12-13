import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers: Array<string> = ['persona 1', 'persona 2', 'persona 3' ];

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  redirect(){
    this.router.navigate(['/inicio/configuracion']);
  }

}
