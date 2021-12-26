import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { worker } from '../models/worker.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url:string = 'http://localhost:3700/';
  public workers: Array<any>;
  constructor(private _http:HttpClient) {
    this.workers = [];
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
