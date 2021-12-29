import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root',
  
})
export class dataService implements OnInit{
  private url:string = 'http://localhost:3700/';
  public workersList: BehaviorSubject<worker[]> = new BehaviorSubject<worker[]>([]);
  constructor(private _http:HttpClient) {} 
  ngOnInit(): void {}

  async load(){
    this.workersList.next(await this.getWorkers().toPromise());
  }

  addWorker(newWorker: worker): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'trabajadores', newWorker, {headers:headers});
  }



  getWorkers() : Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajadores', {headers:headers});
  }

}
