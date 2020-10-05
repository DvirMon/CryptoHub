import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';

import { ChartService } from 'src/app/services/chart.service';
import { CoinsService } from 'src/app/services/coins.service';

import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CurrencyModel } from 'src/app/utilities/models/currency.model';

import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chart-doughnut-card',
  templateUrl: './chart-doughnut-card.component.html',
  styleUrls: ['./chart-doughnut-card.component.scss']
})
export class ChartDoughnutCardComponent implements OnInit, OnDestroy {


  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public data: ChartDotModel[] = []

  private unsubscribe: Subscription

  constructor(
    private chartService: ChartService,
    private coinService: CoinsService
  ) { }

  ngOnInit() {
    this.subscribeToCoinId()
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  private subscribeToCoinId() {

    this.unsubscribe = this.chartService.doughnutCoin.pipe(
      switchMap((coinId: string) => {
        return this.coinService.getCoinCurrency(coinId)
      }))
      .pipe(
        map((currency: CurrencyModel) => {
          delete currency.url
          return currency
        }))
      .subscribe(
        (currency: CurrencyModel) => {
          this.clearData()
          this.handleChartDot(currency)
        }

      )
  }

  private handleChartDot(currency: any) {


    for (const item in currency) {

      this.handleDoughnutData(currency[item], item)
      this.handleChartInfo(currency[item], item)
    }
  }


  private handleChartInfo(data: any, item: string) {

    const dot = {
      label: item.toLocaleUpperCase(),
      data: data
    }

    this.data.push(dot)
  }

  private handleDoughnutData(data: number, item: string) {

    this.doughnutChartLabels.push(item)
    this.doughnutChartData.push(data)
  }

  private clearData() {
    this.data = []
    this.doughnutChartLabels = []
    this.doughnutChartData = []
  }

}
