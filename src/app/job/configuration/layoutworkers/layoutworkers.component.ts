import { Component, EventEmitter, OnInit, OnDestroy ,Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { dataService } from '../../../services/data.service';
import { worker } from 'src/app/models/worker.model';
import { Subscription } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { WorkersService } from '../../../services/workers/workers.service';
import {DateTime, Settings} from 'luxon'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-layoutworkers',
  templateUrl: './layoutworkers.component.html',
  styleUrls: ['./layoutworkers.component.scss']
})
export class LayoutworkersComponent implements OnInit, OnDestroy {
  
  
  public workers: Array<any>;
  public newWorker: string;
  private listSubscription: Subscription = new Subscription();
  private newSubscription: Subscription = new Subscription();

  //FIXME: i must update this type of data to date
 
 
  
  
  @Output() nameWorker = new EventEmitter<string>();
  @Output() workerID = new EventEmitter<string>();
  @Output() displayLayoutWorkers = new EventEmitter<boolean>();
  
  @ViewChild("addNewWorker") form!: ElementRef;
  
  constructor(
    private dataService:dataService, 
    private workerService:WorkersService, 
    private render:Renderer2,
    private datePipe: DatePipe
    ){
      this.workers = [];
      this.newWorker = '';
    }
    
    ngOnInit(): void {
      Settings.defaultZone = 'America/Buenos_Aires';  
      Settings.defaultLocale = 'es_AR';
      this.getWorker();
    }
    
    ngOnDestroy(): void {
      this.listSubscription.unsubscribe();
      this.newSubscription.unsubscribe();
    }
    
    
    getWorker(){
      this.listSubscription =  this.workerService.workersList.subscribe(
        (response) =>{
          this.workers = response;
          
        },
        (error) =>{
          console.log(error);
        }
        )
      }
      
      addWorker(){
        this.render.setStyle(this.form.nativeElement, 'display', 'flex');
      }

      
      add(){
        let newWorker = new worker(this.newWorker, true, true, DateTime.now().toString() , DateTime.now().toString(), '');
        
        this.newSubscription = this.dataService.addWorker(newWorker)
    .pipe(concatMap(worker => this.dataService.getWorkers()))
    .subscribe(
      response =>{
        this.workerService.workersList.next(response);
      }, error =>{
        console.log(error);
      }
    );
      this.newWorker = "";
      this.render.setStyle(this.form.nativeElement, 'display', 'none'); 
  }


  redirect(worker:string[]){
    this.workerService.worker.next(worker);
    this.displayLayoutWorkers.emit(false);
  }
}