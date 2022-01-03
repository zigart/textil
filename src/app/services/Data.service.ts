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
  //attandant

  getAttandant(){
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'encargado', {headers:headers});
  }

  //workers

  getWorkers() : Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajadores', {headers:headers});
  }

  getWorker(id:string) : Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajador/' + id, {headers:headers});
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

  getMachine(id:string): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'maquina/'+ id, {headers:headers});
  }

  addMachine(newMachine: machine): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'maquinas', newMachine, {headers:headers});
  }

  updateActiveMachine(id:string, newValue:boolean):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'maquina/'+ id, newValue, {headers:headers});
  }

}
