import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivideComponent } from './divide/divide.component';
import { FindjobComponent } from './findjob/findjob.component';
import { JobComponent } from './job/job.component';
import { MachinesComponent } from './machines/machines.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: JobComponent,
  children: [
    {path: 'trabajo', component: FindjobComponent},
    {path: 'revisar', component: ReviewComponent},
    {path: 'separar', component: DivideComponent},
    {path: 'configuracion', component: MachinesComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
