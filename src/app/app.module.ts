import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './workers/workers.component';
import { JobComponent } from './job/job.component';
import { ReviewComponent } from './review/review.component';
import { FindjobComponent } from './findjob/findjob.component';
import { DivideComponent } from './divide/divide.component';
import { FormsModule } from '@angular/forms';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MachinecfgComponent } from './machinecfg/machinecfg.component';
import { LayoutmachineComponent } from './layoutmachine/layoutmachine.component';
import { WorkerscfgComponent } from './workerscfg/workerscfg.component';
import { DataService } from './services/Data.service';

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
    WorkerscfgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
