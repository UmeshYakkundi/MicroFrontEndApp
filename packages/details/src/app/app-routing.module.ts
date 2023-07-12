import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { TopologyComponent } from './topology/topology.component';

const routes: Routes = [
  {path: '', component: DetailsComponent},
  {path: 'topology', component: TopologyComponent},
  {path: 'details', component: DetailsComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
