import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartGuard } from '../utilities/guards/chart.guard';
import { ChartDashboardComponent } from './components/chart-dashboard/chart-dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { MyLineChartComponent } from './components/my-line-chart/my-line-chart.component';


const routes: Routes = [
  {
    path: "", component: ChartDashboardComponent, canActivate: [ChartGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
