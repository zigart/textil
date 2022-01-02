import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { dataService } from 'src/app/services/data.service';
import { WorkersService } from 'src/app/services/workers/workers.service';

@Component({
  selector: 'app-workerscfg',
  templateUrl: './workerscfg.component.html',
  styleUrls: ['./workerscfg.component.scss']
})
export class WorkerscfgComponent implements OnInit, OnDestroy {
  @Input() workerID!:string;
  @Input() workerName!:string;
  @Output() clicked = new EventEmitter<boolean>();


  public individualWorker!:any;
  private getWorker: Subscription = new Subscription();
  constructor(
    private dataService:dataService,
    private workersService: WorkersService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
  
    this.getWorkerCfg();
  }
  
  ngOnDestroy(): void {
   this.getWorker.unsubscribe();
  }



  getWorkerCfg(){
    this.workerID = this.route.snapshot.params['id'];
    
    this.getWorker = this.dataService.getWorker(this.workerID).subscribe(
      response =>{
        this.individualWorker = response;
      }
      );
  }
  



}
