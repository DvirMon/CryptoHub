import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartModel } from 'src/app/utilities/models/chart-data';
import { store } from 'src/app/utilities/redux/store';

import { interval } from 'rxjs';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit, AfterViewInit, OnDestroy {


  // CHART PARAMS

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  // 

  private selectedCoins: string[] = []
  private serverData: ChartModel[] = []
  private clearInterval: any

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.subscribeToStore()
    this.setStartChartData()
  }

  ngAfterViewInit(): void {

    this.getChartData()

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
        this.selectedCoins = store.getState().coins.selectedCoins
      }
    )
    this.selectedCoins = store.getState().coins.selectedCoins
  }

  // CHART SECTION

  private setStartChartData() {

    this.lineChartData = this.selectedCoins.map(
      (label: string) => {
        return new ChartModel(label, [0])
      }
    )

    this.lineChartLabels.push(new Date().toLocaleTimeString())


  }

  // HTTP SECTION

  private getChartData() {
    this.chartService.getChartData().subscribe(
      (serverData: ChartData) => {
        this.serverData = serverData.usd
        this.updateChartDots()
        this.formatChartDots()

      }
    )
  }

  // LOGIC SECTION

  private updateChartDots() {

    this.lineChartData.map((dot: ChartModel) => {
      const coin = this.findCoinToUpdate(dot.label)
      dot.data = dot.data.concat(coin.data)
    })

    this.lineChartLabels.push(new Date().toLocaleTimeString())

  }

  private findCoinToUpdate(label: string) {
    return this.serverData.find((dot: ChartModel) => dot.label === label)
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
