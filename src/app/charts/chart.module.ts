import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartsModule } from 'ng2-charts';

import { ChartDashboardComponent } from './components/chart-dashboard/chart-dashboard.component';
import { ChartLineCardComponent } from './components/chart-line-card/chart-line-card.component';
import { ChartBarCardComponent } from './components/chart-bar-card/chart-bar-card.component';
import { ChartPieCardComponent } from './components/chart-pie-card/chart-pie-card.component';
import { ChartLineHistoryComponent } from './components/chart-line-history/chart-line-history.component';
import { ChartMenuComponent } from './components/chart-menu/chart-menu.component';
import { ChartDoughnutCardComponent } from './components/chart-doughnut-card/chart-doughnut-card.component';

 

@NgModule({
  declarations: [
    ChartDashboardComponent,
    ChartLineCardComponent,
    ChartBarCardComponent,
    ChartPieCardComponent,
    ChartLineHistoryComponent,
    ChartMenuComponent,
    ChartDoughnutCardComponent
  ],
  imports: [ 
    CommonModule,
    ChartRoutingModule,
    SharedModule,
    ChartsModule,
  ],
})
export class ChartModule { }
