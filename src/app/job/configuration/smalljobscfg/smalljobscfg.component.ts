import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { toDo } from 'src/app/models/todo.model';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-smalljobscfg',
  templateUrl: './smalljobscfg.component.html',
  styleUrls: ['./smalljobscfg.component.scss']
})
export class SmalljobscfgComponent implements OnInit {

  @ViewChild('btnShowForm') btnShowForm!:ElementRef;
  @ViewChild('form') form!:ElementRef;

  public toDoInput:string = '';
  public jobs:Array<any> = [];
  constructor(
    public dataService:dataService,
    public render:Renderer2
  ) { }

  ngOnInit(): void {
    this.getToDo();
  }
  getToDo(){
    this.dataService.getToDo().subscribe(
      response => this.jobs = response
    );
  }


  showForm(){
    this.render.setStyle(this.btnShowForm.nativeElement, 'display', 'none');
    this.render.setStyle(this.form.nativeElement, 'display', 'flex');
  }



  addToDo(){

    let todo = new toDo(this.toDoInput,false);

    this.dataService.addToDo(todo).subscribe(
      response => {
        this.getToDo();
      }
    );


  }


  deleteToDo(id:any){
    console.log(id);
    this.dataService.deleteToDo(id).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }




}
