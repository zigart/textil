import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

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
