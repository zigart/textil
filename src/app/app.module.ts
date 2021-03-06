import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './workers/workers.component';
import { JobComponent } from './job/job.component';
import { ReviewComponent } from './job/review/review.component';
import { FindjobComponent } from './job/findjob/findjob.component';
import { DivideComponent } from './job/divide/divide.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationComponent } from './job/configuration/configuration.component';
import { MachinecfgComponent } from './job/configuration/machinecfg/machinecfg.component';
import { LayoutmachineComponent } from './job/configuration/layoutmachine/layoutmachine.component';
import { LayoutworkersComponent } from './job/configuration/layoutworkers/layoutworkers.component';
import { dataService } from './services/data.service';
import { WorkerscfgComponent } from './job/configuration/workerscfg/workerscfg.component';
import { HttpClientModule } from '@angular/common/http'; 
import { WorkersService } from './services/workers/workers.service';
import { MachineService } from './services/machine/machine.service';
import { LoginService } from './services/config/login.service';
import { LoginGuard } from './job/configuration/login.guard';
import { NavComponent } from './job/configuration/nav/nav.component';
import { FrontpageComponent } from './job/frontpage/frontpage.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
import { DatePipe } from '@angular/common';
import { SmalljobsComponent } from './job/smalljobs/smalljobs.component';
import { DivideService } from './services/divide/divide.service';
import { SmalljobscfgComponent } from './job/configuration/smalljobscfg/smalljobscfg.component';
import { LoginworkerComponent } from './loginworker/loginworker.component';
import { WorkerpasswordGuard } from './loginworker/workerpassword.guard';
import { AttendantcfgComponent } from './job/configuration/attendantcfg/attendantcfg.component';
import { RegisterComponent } from './job/configuration/register/register.component';


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
    WorkerscfgComponent,
    NavComponent,
    FrontpageComponent,
    NotfoundcomponentComponent,
    SmalljobsComponent,
    SmalljobscfgComponent,
    LoginworkerComponent,
    AttendantcfgComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [dataService,
    WorkersService,
    MachineService,
    LoginGuard,
    WorkerpasswordGuard,
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: (WorkersService: WorkersService ) => () => WorkersService.load(),
      deps:[WorkersService],
      multi: true
     },
     {
      provide: APP_INITIALIZER,
      useFactory: (machineService: MachineService ) => () => machineService.load(),
      deps:[MachineService],
      multi: true
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
