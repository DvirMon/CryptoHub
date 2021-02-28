import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartGuard } from '../utilities/guards/chart.guard';

import { ChartDashboardComponent } from './components/chart-dashboard/chart-dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ChartGuard],
    component: ChartDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
