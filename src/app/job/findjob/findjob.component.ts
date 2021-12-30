import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.scss']
})
export class FindjobComponent{

  checkboxValue : boolean = true;
  constructor(private router: Router) { }


   nextStep() {
     if(this.checkboxValue === true){
      this.router.navigate(['/inicio/revisar'])
     }else{
       this.router.navigate(['/inicio/separar'])
     }
  }
  

}
