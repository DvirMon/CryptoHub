import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';

import { ChartHistory, ChartService } from 'src/app/services/chart.service';

import { MarketHistoryModel } from 'src/app/utilities/models/market-history.model';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chart-line-history',
  templateUrl: './chart-line-history.component.html',
  styleUrls: ['./chart-line-history.component.scss']
})
export class ChartLineHistoryComponent implements OnInit, OnDestroy {

  @Input() currentCurrency: string

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        offset: true,
        ticks: {
          beginAtZero: true,
          stepSize: 0,
          min: 0,
        }
      }],

      xAxes: [{
        ticks: {
          maxTicksLimit: 5
        }
      }]
    }
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  private coinId: string
  private unsubscribe: Subscription


  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.subscribeToConId()
    this.subscribeToChartData()
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  // SUBSCRIPTION SECTION

  private subscribeToConId() {
    this.unsubscribe = this.chartService.historyCoin.subscribe(
      (history: ChartHistory) => {
        this.coinId = history.coinId
      })
  }

  private subscribeToChartData() {
    this.chartService.getCoinMarketHistory().subscribe(
      (market_history: MarketHistoryModel) => {
        this.handleChartData(market_history)
      }
    )
  }


  // HTTP SECTION
  private handleChartData(market_history: MarketHistoryModel) {

    this.lineChartData = []

    this.lineChartData.push(new ChartDotModel(
      this.coinId, market_history.values
    ))

    this.lineChartLabels = market_history.dates

  }




  // LOGIC SECTION
  private handleStepSize(values): number {

    const stepSize = (Math.ceil(Math.max(...values)) / 5)


    if (stepSize > 100 && stepSize < 1000) {

      return Math.ceil(stepSize / 100) * 100
    }

    if (stepSize > 1000) {

      return Math.ceil(stepSize / 100) * 100
    }

    return stepSize

  }

}
