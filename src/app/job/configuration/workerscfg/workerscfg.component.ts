import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private updateSubscribe:Subscription = new Subscription();
  public password!:string;

  constructor(
    private dataService:dataService,
    private workersService: WorkersService,
    private route: ActivatedRoute,
    private routeNav: Router
  ) { }
  
  ngOnInit(): void {
  
    this.getWorkerCfg();
  }
  
  ngOnDestroy(): void {
   this.getWorker.unsubscribe();
  }


  changeReviewerState(e:any){

    this.individualWorker.activeReviewer = e.target.checked;
    this.updateSubscribe= this.dataService.updateWorker(this.individualWorker._id, this.individualWorker).subscribe(
      (response)=>{},
      (error)=>{
        console.log(error);
      }
    );
  }

  changeDividerState(e:any){

    this.individualWorker.activeDivider = e.target.checked;
    this.updateSubscribe = this.dataService.updateWorker(this.individualWorker._id, this.individualWorker).subscribe(
      (response)=>{},
      (error)=>{
        console.log(error);
      });
  }


  getWorkerCfg(){
    this.workerID = this.route.snapshot.params['id'];
    
    this.getWorker = this.dataService.getWorker(this.workerID).subscribe(
      response =>{
        this.individualWorker = response;
        this.password = this.individualWorker.password;
      }
      );
  }
  

  deleteWorker(workerID:string){

    if(window.confirm('Este trabajador sera irrecuperable')){

      this.dataService.deleteWorker(workerID)
      .pipe(concatMap(worker=>this.dataService.getWorkers()))
      .subscribe(
        (response)=>{
          this.workersService.workersList.next(response);
          this.routeNav.navigate(['inicio/configuracion/trabajadores']);
        }
      )
    }
 
  }

  changePassword(){

    if(window.confirm('Desea modificar la contraseña?')){
      this.individualWorker.password = this.password;
      this.dataService.updateWorker(this.workerID, this.individualWorker).subscribe();
    }
  }

}
