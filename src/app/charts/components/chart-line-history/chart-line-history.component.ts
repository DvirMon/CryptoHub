import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartService, MarketHistoryData } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { MarketHistoryModel } from 'src/app/utilities/models/market-history.model';

@Component({
  selector: 'app-chart-line-history',
  templateUrl: './chart-line-history.component.html',
  styleUrls: ['./chart-line-history.component.scss']
})
export class ChartLineHistoryComponent implements OnInit {

  @Input() coinId: string

  private stepSize: number = 0

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        offset: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSize,
          min: 0,
        }
      }],

      xAxes: [{
        ticks: {
          maxTicksLimit: 12
          // display: false,
        }
      }]
    }
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];


  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {

    this.getData()
  }

  private getData() {
    this.chartService.getCoinMarketHistory(this.coinId).subscribe(
      (market_history: MarketHistoryModel) => {

        this.lineChartData.push(new ChartDotModel(
          this.coinId, market_history.values
        ))

        this.lineChartOptions.scales.yAxes[0].ticks.stepSize = this.handleStepSize(market_history.values)

        this.lineChartLabels = market_history.dates

      }
    )
  }

  private handleStepSize(values): number {

    
    const stepSize = (Math.ceil(Math.max(...values)) / 5)

    if (stepSize > 100) {

      return Math.ceil(stepSize / 100) * 100
    }



    return stepSize

  }

}
