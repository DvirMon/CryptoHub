import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';

@Component({
  selector: 'app-chart-bar-card',
  templateUrl: './chart-bar-card.component.html',
  styleUrls: ['./chart-bar-card.component.scss']
})
export class ChartBarCardComponent implements OnInit {

  
  @Input() data: ChartDotModel[]
  // @Input() barChartLabels: Label[] = [];


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['USD', 'EUR', 'ILS'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Series A' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
