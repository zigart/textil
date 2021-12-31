import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit {
  @Input() workerID!:string;
  @Input() workerName!:string;
  @Output() clicked = new EventEmitter<boolean>();

  constructor(
    private dataService:dataService
  ) { 
    
  }

  ngOnInit(): void {
    this.getWorkerCfg();
  }

  getWorkerCfg(){
    this.dataService.getWorker(this.workerID).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  back(){
    this.clicked.emit(true);
  }
}
