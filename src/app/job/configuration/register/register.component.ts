import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dataService } from 'src/app/services/data.service';
import { DateTime } from 'luxon';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

public register!:Array<any> ;
public divideRegister!:Array<any>;
public filteredRegister!:Array<any>;
public initialDate!:Date
public finalDate!:Date
private fileName: string = 'datos.xlsx';

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

     filterByDate(){
      console.log(DateTime.fromISO(this.initialDate.toString()));
     this.register = this.register.filter(a => {
        return (<any>DateTime.fromISO(a.date) >=  DateTime.fromISO(this.initialDate.toString()) && DateTime.fromISO(this.finalDate.toString())>= <any>DateTime.fromISO(a.date));
      });
      console.log(this.register);
     }

     exportExcel(){

      /* table id is passed over here */   
      let element = document.getElementById('excel-table'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
     }


      
    }
    