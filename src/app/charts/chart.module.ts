import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './components/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartsModule } from 'ng2-charts';
import { MyLineChartComponent } from './components/my-line-chart/my-line-chart.component';
import { ChartDashboardComponent } from './components/chart-dashboard/chart-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

 

@NgModule({
  declarations: [
    ChartComponent,
    MyLineChartComponent,
    ChartDashboardComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    SharedModule,
    ChartsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule

  ],
})
export class ChartModule { }
