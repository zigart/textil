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
import { MachinesComponent } from './machines/machines.component';
import { MachinecfgComponent } from './machinecfg/machinecfg.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    JobComponent,
    ReviewComponent,
    FindjobComponent,
    DivideComponent,
    MachinesComponent,
    MachinecfgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
