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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
