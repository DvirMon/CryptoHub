import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ChartData, ChartService } from 'src/app/services/chart.service';

import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { ChartDotModel, DoughnutDot } from 'src/app/utilities/models/chart-dot.model';
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


  public currentChartCurrency = {
    line: "USD",
    pie: "USD",
    history: "USD",
  }

  public data: ChartDotModel[] = []
  public doughnutData: DoughnutDot[] = []
  public selectedCoins: CoinModel[] = []

  public currencies: string[] = []
  public ids: string[] = []

  public coinToDelete: CoinModel

  private chartData: ChartData;
  private currentHistoryCoin: string;

  constructor(
    private chartService: ChartService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeToStore()
    this.subscribeToCoinId()
    this.handleChartData()
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.handleLineHistoryChartData(this.selectedCoins[0].id)
    }, 1000)
  }


  // HTTP SECTION

  private handleChartData() {
    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.chartData = chartData
        this.data = this.chartData.usd
        this.currencies = this.chartData.currencies
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

  // DELETE COIN WHEN TOGGLE
  private subscribeToCoinId() {
    this.chartService.deleteCoin.subscribe(
      (coin: CoinModel) => {

        if (coin) {
          this.coinToDelete = coin
          this.handleChartData()
        }
      }
    )
  }

  // LOGIC SECTION

  // Change chart data by coin currency
  public handleCurrencyChange(payload: { type: string, currency: string }) {


    this.currentChartCurrency[payload.type] = payload.currency.toUpperCase()

    if (payload.type === "pie" || payload.type === "line") {
      this.data = this.chartData[payload.currency]
    }

    else {
      console.log()
      this.handleLineHistoryChartData(this.currentHistoryCoin)
    }

  }

  // Change chart data by coin 

  public handleCoinChange(payload: { type: string, coin: string }) {
    this.handleLineHistoryChartData(payload.coin)
  }

  // handle history chart subject
  private handleLineHistoryChartData(coinId: string) {
    this.currentHistoryCoin = coinId
    this.chartService.historyCoin.next({ coinId, currency: this.currentChartCurrency.history })
  }











}
