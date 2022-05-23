import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { worker } from '../models/worker.model';
import { machine } from '../models/machine.model';
import { attendant } from '../models/attendant.model';

@Injectable({
  providedIn: 'root',
  
})
export class dataService{
  //private url:string = 'http://192.168.0.99:3700/';
  private url:string = 'http://192.168.0.99:3700/';

  constructor(private _http:HttpClient) {} 
  //attandant


  /**
   * @function getAttendant
   * give an attendant
   * @return {*}  {Observable<any>}
   * @memberof dataService
   */
  getAttendants():Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'encargados', {headers:headers});
  }

/**
 * @function getAttendant
 * this observable'll give an attendant
 * @param {string} attendantID
 * @return {*}  {Observable<any>}
 * @memberof dataService
 */
getAttendant(attendantID:string):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'encargado/' + attendantID, {headers:headers});
  }

  /**
   * @function attendant
   * used to create a new attendant
   * @param {attendant} attendant
   * @return {*}  {Observable<any>}
   * @memberof dataService
   */
  addAttendant(attendant:attendant):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'encargado', attendant, {headers:headers});
  }

  /**
   * @function updateAttendant
   * 
   * @param {string} attendantID
   * @param {*} newValues
   * @return {*}  {Observable<any>}
   * @memberof dataService
   */
  updateAttendant(attendantID:string, newValues:any):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'encargado/' + attendantID, newValues ,{headers:headers})
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

  updateMachine(id:string, newValue:any){
    let headers = new HttpHeaders();
    return this._http.put(this.url + 'maquina/'+ id, newValue, {headers:headers});
  }

  deleteMachine(id:string): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.delete(this.url + 'maquina/' + id, {headers:headers});
  }

  //reviews


  getReview():Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'revision', {headers:headers});
  }

  sendReview(review:any): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'revisar', review, {headers:headers});
  }
  //divide

  getDivide():Observable<any>{
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'division', {headers:headers});
  }
  sendDivideForm(divide:any): Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'separar', divide, {headers:headers});
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

  //register


}
