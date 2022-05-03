import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dataService } from 'src/app/services/data.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

public register!:Array<any> ;
public divideRegister!:Array<any>;
public filteredRegister!:Array<any>;

@ViewChild("filters") filters!: ElementRef;

  constructor(
    private dataService:dataService
  ) { }

  ngOnInit(): void {
  this.dataService.getReview().subscribe(
    response => {
    this.register = response;
  }
  );
  this.dataService.getDivide().subscribe(
    response => {
    this.divideRegister =  response;

    this.divideRegister.forEach(divide=> this.register.push(divide))
      this.sortByLastModifiedDesc(this.register);
  }
  );
  }

  
  RadioButtonFilter(event:any){
    
    //get the review data and divide data, reaplace the register array and sort it.
    
    if(event === 'all'){
      this.dataService.getReview().subscribe(
        response => {
          this.register = response;
        }
        );
        this.dataService.getDivide().subscribe(
          response => {
        this.divideRegister =  response;
    
        this.divideRegister.forEach(divide=> this.register.push(divide))
        this.sortByLastModifiedDesc(this.register);
      }
      );
    }else if(event == 'review'){
      
      //get the review data, replace the register array and sort it.
      
      this.dataService.getReview().subscribe(
        response => {
          this.register = response;
          this.sortByLastModifiedDesc(this.register);
        }
        );
      }else if(event == 'divide'){
        
        //get the divide data, and replace the register array and sort it.
        
        this.dataService.getDivide().subscribe(
          response => {
            this.register = response
            this.sortByLastModifiedDesc(this.register);
          }
          );
        }
      }
      
      sortByLastModifiedDesc(Array:Array<any>) {
       return Array.sort((a: any, b: any) => {
         return <any>DateTime.fromISO(b.date) - <any>DateTime.fromISO(a.date);
       });
     }


      
    }
    