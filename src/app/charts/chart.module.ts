import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './components/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartsModule } from 'ng2-charts';

import { ChartDashboardComponent } from './components/chart-dashboard/chart-dashboard.component';
import { ChartLineCardComponent } from './components/chart-line-card/my-line-chart.component';
import { ChartBarCardComponent } from './components/chart-bar-card/chart-bar-card.component';
import { ChartPieCardComponent } from './components/chart-pie-card/chart-pie-card.component';
import { ChartLineHistoryComponent } from './components/chart-line-history/chart-line-history.component';

 

@NgModule({
  declarations: [
    ChartComponent,
    ChartDashboardComponent,
    ChartLineCardComponent,
    ChartBarCardComponent,
    ChartPieCardComponent,
    ChartLineHistoryComponent
  ],
  imports: [ 
    CommonModule,
    ChartRoutingModule,
    SharedModule,
    ChartsModule,
  ],
})
export class ChartModule { }
