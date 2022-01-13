import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-divide',
  templateUrl: './divide.component.html',
  styleUrls: ['./divide.component.scss']
})
export class DivideComponent implements OnInit {

  @ViewChild('start') start!:ElementRef;
  @ViewChild('finish') finish!:ElementRef;

  public workerID!:string;
  public worker:any;
  private updateSubscription:Subscription = new Subscription();
  constructor(
    private render:Renderer2,
    private activeRoute: ActivatedRoute,
    private dataService: dataService
  ) { }



  ngOnInit(): void {
    this.workerID = this.activeRoute.snapshot.params['id'];
    this.dataService.getWorker(this.workerID).subscribe(
    (response)=>{
      this.worker = response
      console.log(this.worker);
    }, 
    (error)=>{
      console.log(error);
    }
    );
    console.log(DateTime.now().toString(), ' ', this.worker);
  }

  startCount(){
    this.render.setStyle(this.start.nativeElement, 'display', 'none');
    this.render.setStyle(this.finish.nativeElement, 'display', 'block');
    console.log(DateTime.now().toString(), ' ', this.worker);
    this.worker.lastDivition = DateTime.now().toString();
    this.updateSubscription = this.dataService.updateWorker2(this.workerID, this.worker).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  finishCount(){
    this.render.setStyle(this.start.nativeElement, 'display', 'block');
    this.render.setStyle(this.finish.nativeElement, 'display', 'none');
  }
}
