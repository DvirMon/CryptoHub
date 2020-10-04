import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ChartData, ChartService } from 'src/app/services/chart.service';

import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';

import { store } from 'src/app/utilities/redux/store';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit, AfterViewInit {

  // GRID PARAMS
  public cards: Observable<ChartCardModel[]> = this.chartService.cards
  public cols: Observable<number> = this.chartService.cols


  public chartCurrencies = {
    line: "USD",
    pie: "USD",
  }

  public data: ChartDotModel[] = []
  public selectedCoins: CoinModel[] = []

  public currencies: string[] = []
  public ids: string[] = []

  public coinToDelete: CoinModel
  public currentCurrency: string
  public coinId: string

  private chartData: ChartData;

  constructor(
    private chartService: ChartService,
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
    this.getChartData()
    this.subscribeToCoinDelete()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleHistoryData(this.selectedCoins[0].id)
    }, 800)
  }


  // HTTP SECTION

  private getChartData() {
    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.chartData = chartData
        this.data = chartData.usd
        this.currencies = chartData.currencies

      }
    )
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
        this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
          return coin.id
        })
      })
    this.selectedCoins = store.getState().coins.selectedCoins
    this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
      return coin.id
    })
  }

  private subscribeToCoinDelete() {
    this.chartService.deleteCoin.subscribe(
      (coin: CoinModel) => {

        if (coin) {
          this.coinToDelete = coin
          this.getChartData()
        }
      }
    )
  }

  // LOGIC SECTION
  public handleMenuChange(event: { payload: string, type: string }) {

    if (event.type !== "history") {

      this.data = this.chartData[event.payload]
      this.chartCurrencies[event.type] = event.payload.toUpperCase()
    }

    else {
      this.handleHistoryData(event.payload)

    }
  }

  private handleHistoryData(coinId: string) {

    // console.log(2)
    this.chartService.historyCoin.next(coinId)

  }








}
