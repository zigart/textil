import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { worker } from '../models/worker.model';
import { machine } from '../models/machine.model';

@Injectable({
  providedIn: 'root',
  
})
export class dataService{
  private url:string = 'http://localhost:3700/';

  constructor(private _http:HttpClient) {} 
  

  //workers

  getWorkers() : Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajadores', {headers:headers});
  }
 
  addWorker(newWorker: worker): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'trabajadores', newWorker, {headers:headers});
  }

  //machines

  getMachines() : Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'maquinas', {headers:headers});
  }

  addMachine(newMachine: machine): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'maquinas', newMachine, {headers:headers});
  }


}
