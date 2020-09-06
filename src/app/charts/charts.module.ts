import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './components/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './charts-routing.module';
 

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    SharedModule

  ],
})
export class ChartsModule { }
