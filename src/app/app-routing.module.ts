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
import { LoginService } from './services/config/login.service';
import { LoginGuard } from './job/configuration/login.guard';
import { FrontpageComponent } from './job/frontpage/frontpage.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'menu', component: FrontpageComponent},
  {path: 'inicio', component: JobComponent,
  children: [
    {path: 'trabajo/:id', component: FindjobComponent},
    {path: 'revisar/:id', component: ReviewComponent},
    {path: 'separar/:id', component: DivideComponent},
    {path: 'configuracion', component: ConfigurationComponent, canActivateChild:[LoginGuard],
    children: [
      {path: 'maquinas', component: LayoutmachineComponent},
      {path: 'maquina/:id', component: MachinecfgComponent},
      {path: 'trabajadores', component: LayoutworkersComponent},
      {path: 'trabajador/:id', component: WorkerscfgComponent}
    ]},
    {path: '**', component: NotfoundcomponentComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
