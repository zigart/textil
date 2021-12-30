import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit {

  @Input() workerName:string;

  constructor() { 
    this.workerName = '';
  }

  ngOnInit(): void {
  }

  @Output() clicked = new EventEmitter<boolean>();

  back(){
    this.clicked.emit(true);
  }
}
