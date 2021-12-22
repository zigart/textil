import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public workers: Array<string>;

  constructor() {
    this.workers = [];
  }

  transferInputWorkers(employees:Array<string>){
    employees.forEach(element => {
      this.workers.push(element);
    });
  }




}
