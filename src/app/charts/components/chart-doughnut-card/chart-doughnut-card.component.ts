import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';

import { DoughnutDot } from 'src/app/utilities/models/chart-dot.model';

@Component({
  selector: 'app-chart-doughnut-card',
  templateUrl: './chart-doughnut-card.component.html',
  styleUrls: ['./chart-doughnut-card.component.scss']
})
export class ChartDoughnutCardComponent implements OnInit {

  @Input() data: DoughnutDot[] = []

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {

    this.subscribeToCoinId()

    this.handleDoughnutChartData()
    setTimeout(() => {

    }, 500)
  }


  private subscribeToCoinId() {

    this.chartService.doughnutCoin.subscribe(
      (coinId: string) => {
        if (coinId)  {
          this.clearChartData()
          this.handleDoughnutChartData()
        }
      }
    )
  }


  private handleDoughnutChartData() {

    console.log(this.data)

    this.data.map((dot: DoughnutDot) => {
      this.doughnutChartLabels.push(dot.label)
      this.doughnutChartData.push(dot.data)
    })


  }

  private clearChartData() {
    this.doughnutChartLabels = []
    this.doughnutChartData = []

  }



}
