import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './workers/workers.component';
import { JobComponent } from './job/job.component';
import { ReviewComponent } from './job/review/review.component';
import { FindjobComponent } from './job/findjob/findjob.component';
import { DivideComponent } from './job/divide/divide.component';
import { FormsModule } from '@angular/forms';
import { ConfigurationComponent } from './job/configuration/configuration.component';
import { MachinecfgComponent } from './job/configuration/machinecfg/machinecfg.component';
import { LayoutmachineComponent } from './job/configuration/layoutmachine/layoutmachine.component';
import { LayoutworkersComponent } from './job/configuration/layoutworkers/layoutworkers.component';
import { dataService } from './services/data.service';
import { WorkerscfgComponent } from './job/configuration/workerscfg/workerscfg.component';
import { HttpClientModule } from '@angular/common/http'; 
import { WorkersService } from './services/workers/workers.service';


@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    JobComponent,
    ReviewComponent,
    FindjobComponent,
    DivideComponent,
    ConfigurationComponent,
    MachinecfgComponent,
    LayoutmachineComponent,
    LayoutworkersComponent,
    WorkerscfgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [dataService,
    WorkersService,
    {
      provide: APP_INITIALIZER,
      useFactory: (WorkersService: WorkersService ) => () => WorkersService.load(),
      deps:[WorkersService],
      multi: true
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
