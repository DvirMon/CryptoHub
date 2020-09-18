import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartGuard } from '../utilities/guards/chart.guard';
import { ChartComponent } from './components/chart/chart.component';


const routes: Routes = [
  {
    path: "", component: ChartComponent, canActivate: [ChartGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
