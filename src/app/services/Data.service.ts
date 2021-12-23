import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public workers: Array<string>;
  constructor() {
    this.workers = ['persona 1', 'persona 2', 'persona 3' ];

  }


  addWorker(newWorker:string){
    this.workers.push(newWorker);
  }





}
