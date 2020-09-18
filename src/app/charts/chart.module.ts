import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './components/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartsModule } from 'ng2-charts';
import { MyLineChartComponent } from './components/my-line-chart/my-line-chart.component';

 

@NgModule({
  declarations: [
    ChartComponent,
    MyLineChartComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    SharedModule,
    ChartsModule

  ],
})
export class ChartModule { }
