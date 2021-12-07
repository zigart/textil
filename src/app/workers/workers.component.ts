import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers: Array<string> = ['persona 1', 'persona 2', 'persona 3' ];

  constructor() {}

  ngOnInit(): void {
  }

}
