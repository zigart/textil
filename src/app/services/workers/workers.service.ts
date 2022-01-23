import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { dataService } from '../data.service';
import { worker } from 'src/app/models/worker.model';


@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  public workersList: BehaviorSubject<worker[]> = new BehaviorSubject<worker[]>([]);

  public worker: Subject<string[]> = new Subject<string[]>();

  public worker2:object = {};
  
  constructor(private dataService:dataService) { }
  
  async load(){
    this.workersList.next(await this.dataService.getWorkers().toPromise());
  }

  getWorker(workerID:string){
    this.dataService.getWorker(workerID).subscribe(
     (response)=>{
      this.worker2 = response;
     }
    )
  }

}


