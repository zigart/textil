import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { dataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy{

  public attandand:any;
  password:string = '';
  private subscription: Subscription = new Subscription();
  loged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private dataService:dataService) {
   this.subscription = this.dataService.getAttandant().subscribe(
      (response)=>{
        this.attandand = response;
        this.password = this.attandand[0].password;
      },
      (error)=>{
        console.log(error);
      }
    );
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
   checkPassword(password:string){
    
    if (this.password == password) {
      this.loged.next(true);
    }else{ 
      this.loged.next(false);
    }
}

}
