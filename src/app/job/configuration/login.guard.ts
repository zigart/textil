import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/config/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {
  
  passwordTyped:string = '';
  res: boolean = false;

  constructor(
    private loginServices: LoginService ){
    }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.res;
  }

  getData(recived:string){
    this.loginServices.checkPassword(recived);
    this.loginServices.loged.subscribe(
      response => {
        console.log(response);
        this.res = response;
      }
    )
  }
  
}
