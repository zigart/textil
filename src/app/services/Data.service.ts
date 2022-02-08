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

  updateWorker(id:string, newValue:boolean){
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'trabajador/'+ id, newValue, {headers:headers});
  }

  updateWorker2(id:string, update:any){
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'trabajador/'+ id, update, {headers:headers});
  }

  deleteWorker(workerID:string){
    let headers = new HttpHeaders();
    return this._http.delete(this.url + 'trabajador/' + workerID, {headers:headers});
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

  //reviews

  sendReviewForm(review:any): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'revision', review, {headers:headers});
  }

  //current work

  saveCurrentWork(work:any):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'trabajo-actual', work, {headers: headers});
  }

  getCurrentWorks():Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajo-actual', {headers:headers});
  }

  getCurrentWork(workerID:string):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajo-actual/' + workerID, {headers:headers});
  }

  deleteCurrentWork(workerID:string):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.delete(this.url + 'trabajo-actual/' + workerID, {headers:headers});
  }

// trabajos secundarios

  getToDo():Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'trabajos-secundarios', {headers:headers});
  }

  addToDo(toDo:object):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'trabajos-secundarios', toDo, {headers:headers});
  }

  deleteToDo(toDo:string):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.delete(this.url + 'trabajos-secundarios/' + toDo, {headers: headers}); 
  }

  updateToDo(toDoID:string, newValue:any):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'trabajos-secundarios/' + toDoID, newValue, {headers:headers});
  }

}
