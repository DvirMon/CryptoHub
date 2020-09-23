import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';

@Component({
  selector: 'app-chart-line-card',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class ChartLineCardComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() selectedCoins: CoinModel[] = []
  @Input() currentCurrency: string = "";

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
          labelString: 'Current Price'
        }
      }]
    }
  }

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  private clearInterval: any
  private data: ChartDotModel[] = []

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {
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
    this.chartService.getChartData().subscribe(
      (chartData: ChartData) => {
        this.data = chartData[this.currentCurrency.toLocaleLowerCase()]
        this.updateChartDots()
        this.formatChartDots()

      }
    )
  }

  // LOGIC SECTION



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

  private formatChartDots() {
    if (this.lineChartLabels.length > 12) {
      this.lineChartData.map(dots => {
        dots.data.shift()
      })
      this.lineChartLabels.shift()
    }
  }

}
