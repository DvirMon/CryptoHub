import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-chart-line-card',
  templateUrl: './chart-line-card.component.html',
  styleUrls: ['./chart-line-card.component.scss']
})
export class ChartLineCardComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() card : ChartCardModel
  @Input() selectedCoins: CoinModel[];
  @Input() coinToDelete: CoinModel;

  // CHART PARAMS
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: ""
        }
      }]
    }
  }

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  // COMPONENT PRAMS
  private ids: string[] = []
  private data: ChartDotModel[] = []
  private clearInterval: any

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.subscribeToStore()
    this.setStartChartData()
    this.getChartData()
  }

  ngAfterViewInit(): void {
    this.clearInterval = setInterval(() => {
      this.getChartData()
    }, 2000)
  }

  ngOnDestroy(): void {
    clearInterval(this.clearInterval)
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
          return coin.id
        })
      })
    this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
      return coin.id
    })
  }


  // CHART SECTION

  private setStartChartData() {

    this.lineChartData = this.selectedCoins.map(
      (coin: CoinModel) => {
        return new ChartDotModel(coin.id, [0])
      }
    )

    this.lineChartLabels.push(new Date().toLocaleTimeString())


  }

  // HTTP SECTION

  private getChartData() {
    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.data = chartData[this.card.currentCurrency.toLocaleLowerCase()]
        this.deleteChartDots()
        this.updateChartDots()
        this.handleAxiosTitle()
        this.formatChartDots()

      }
    )
  }

  // LOGIC SECTION

  private deleteChartDots() {

    if (this.coinToDelete) {

      const indexToDelete = this.lineChartData.findIndex((dot: ChartDotModel) => {
        return dot.label === this.coinToDelete.id
      })

      if (indexToDelete >= 0) {
        this.lineChartData.splice(indexToDelete, 1)
      }
    }
  }


  private updateChartDots() {

    this.lineChartData.map((dot: ChartDotModel) => {
      const coin = this.findCoinToUpdate(dot.label)
      dot.data = dot.data.concat(coin.data)
    })

    this.lineChartLabels.push(new Date().toLocaleTimeString())
  }

  private findCoinToUpdate(label: string) {
    return this.data.find((dot: ChartDotModel) => dot.label === label)
  }

  // KEEP ONLY 12 DOTS
  private formatChartDots() {
    if (this.lineChartLabels.length > 12) {
      this.lineChartData.map(dots => {
        dots.data.shift()
      })
      this.lineChartLabels.shift()
    }
  }

  private handleAxiosTitle() {
    this.lineChartOptions.scales.yAxes[0].scaleLabel.labelString = this.card.currentCurrency
  }


}
