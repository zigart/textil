import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivideComponent } from './job/divide/divide.component';
import { FindjobComponent } from './job/findjob/findjob.component';
import { JobComponent } from './job/job.component';
import { ConfigurationComponent } from './job/configuration/configuration.component'
import { ReviewComponent } from './job/review/review.component';
import { LayoutmachineComponent } from './job/configuration/layoutmachine/layoutmachine.component';
import { MachinecfgComponent } from './job/configuration/machinecfg/machinecfg.component';
import { LayoutworkersComponent } from './job/configuration/layoutworkers/layoutworkers.component';
import { WorkerscfgComponent } from './job/configuration/workerscfg/workerscfg.component';
import { LoginGuard } from './job/configuration/login.guard';
import { FrontpageComponent } from './job/frontpage/frontpage.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
import { SmalljobsComponent } from './job/smalljobs/smalljobs.component';
import { SmalljobscfgComponent } from './job/configuration/smalljobscfg/smalljobscfg.component';
import { LoginworkerComponent } from './loginworker/loginworker.component';
import { WorkerpasswordGuard } from './loginworker/workerpassword.guard';
import { AttendantcfgComponent } from './job/configuration/attendantcfg/attendantcfg.component';
import { RegisterComponent } from './job/configuration/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'menu', component: FrontpageComponent},
  {path: 'inicio', component: JobComponent,
  children: [
    
    {path: 'password/:id', component: LoginworkerComponent, canActivateChild:[WorkerpasswordGuard], 
    children: [
      {path: 'trabajo', component: FindjobComponent},
      {path: 'revisar', component: ReviewComponent},
      {path: 'separar', component: DivideComponent},
      {path: 'trabajos-secundarios', component: SmalljobsComponent},  
    ]},
    {path: 'configuracion', component: ConfigurationComponent, canActivateChild:[LoginGuard],
    children: [
      {path: 'maquinas', component: LayoutmachineComponent},
      {path: 'maquina/:id', component: MachinecfgComponent},
      {path: 'trabajadores', component: LayoutworkersComponent},
      {path: 'trabajador/:id', component: WorkerscfgComponent},
      {path: 'encargado/:id', component: AttendantcfgComponent},
      {path: 'registro', component: RegisterComponent},  
      {path: 'trabajos-secundarios', component: SmalljobscfgComponent}
    ]},
    {path: '**', component: NotfoundcomponentComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
