import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart-doughnut-card',
  templateUrl: './chart-doughnut-card.component.html',
  styleUrls: ['./chart-doughnut-card.component.scss']
})
export class ChartDoughnutCardComponent implements OnInit {

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public doughnutChartLabels: Label[] = ['USD', 'EUR', 'ILS'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
