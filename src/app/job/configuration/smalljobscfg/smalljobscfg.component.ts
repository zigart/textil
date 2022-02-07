import { Component, OnInit } from '@angular/core';
import { toDo } from 'src/app/models/todo.model';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-smalljobscfg',
  templateUrl: './smalljobscfg.component.html',
  styleUrls: ['./smalljobscfg.component.scss']
})
export class SmalljobscfgComponent implements OnInit {

  public toDoInput:string = '';

  constructor(
    public dataService:dataService
  ) { }

  ngOnInit(): void {
  }

  addToDo(){

    let todo = new toDo(this.toDoInput,false);

    this.dataService.addToDo(todo).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }


}
