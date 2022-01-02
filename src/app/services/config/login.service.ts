import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  password:string = '';
  loged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  checkPassword(password:string){
    
    if (this.password == password) {
      this.loged.next(true);
    }else{ 
      this.loged.next(false);
    }
}

}
