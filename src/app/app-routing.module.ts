import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivideComponent } from './job/divide/divide.component';
import { FindjobComponent } from './job/findjob/findjob.component';
import { JobComponent } from './job/job.component';
import { ConfigurationComponent } from './job/configuration/configuration.component'
import { ReviewComponent } from './job/review/review.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: JobComponent,
  children: [
    {path: 'trabajo', component: FindjobComponent},
    {path: 'revisar', component: ReviewComponent},
    {path: 'separar', component: DivideComponent},
    {path: 'configuracion', component: ConfigurationComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
