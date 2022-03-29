import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { worker } from 'src/app/models/worker.model';
import { dataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy{

  public attendant:any;
  public password!:string;
  public logedChild!:boolean;
  public logedChildWorker!:boolean;
  private subscription: Subscription = new Subscription();
  private subscriptionWorker:Subscription = new Subscription();
  public loged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public logedWorker:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLogin:boolean = true;
  public showLoginWorker:boolean = true;

  public worker!:worker;
  public workerID!:string;

  constructor(private dataService:dataService, private route: ActivatedRoute,
    private router:Router) {
    
      //Attandant

      this.subscription = this.dataService.getAttandant().subscribe(
        (response)=>{
          this.attendant = response;
          this.password = this.attendant[0].password;
        },
        (error)=>{
          console.log(error);
        });
      
      
        
      
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionWorker.unsubscribe();
  }
  
   checkPassword(password:string){
     if (this.password == password) {
       this.loged.next(true);
    }else{ 
      this.loged.next(false);
    }
  }
  
  checkPasswordWorker(password:string){
    
    
  if (this.worker.password == password) {
    this.logedWorker.next(true);
  }else{ 
    this.logedWorker.next(false);
  }
}

}
