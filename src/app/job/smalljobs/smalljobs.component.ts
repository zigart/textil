import { Component, OnInit } from '@angular/core';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-smalljobs',
  templateUrl: './smalljobs.component.html',
  styleUrls: ['./smalljobs.component.scss']
})
export class SmalljobsComponent implements OnInit {

  public jobs:Array<any> = [];

  public checkbox:any;

  constructor(
    private dataService:dataService
  ) { }

  ngOnInit(): void {
    this.dataService.getToDo().subscribe(
      response => this.jobs = response
    );
  }


  updateValue(jobID:string, status:any){
    
    let newValue = status;

    if(!newValue.done){
      newValue.done = true;
      this.dataService.updateToDo(jobID, newValue).subscribe();
    }else if(newValue.done){
      newValue.done = false;
       this.dataService.updateToDo(jobID, newValue).subscribe();

     }
  }
}
