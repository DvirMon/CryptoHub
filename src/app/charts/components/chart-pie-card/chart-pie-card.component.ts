import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { FormService } from 'src/app/services/form.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-chart-pie-card',
  templateUrl: './chart-pie-card.component.html',
  styleUrls: ['./chart-pie-card.component.scss']
})

export class ChartPieCardComponent implements OnInit, OnDestroy {


  @Input() data: ChartDotModel[]
  @Input() currentCurrency: string

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  private ids: string[] = []


  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.subscribeToStore()
    this.handlePieChartData()
    this.subscribeToCoinDelete()
  }

  ngOnDestroy(): void {

  }

  // SUBSCRIPTION SECTION 

  private subscribeToCoinDelete() {
    this.chartService.deleteCoin.subscribe(
      (coin) => {
        if (coin) {
          this.cleanChartData()
          this.getChartData()
        }
      }
    )
  }

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

  // HTTP SECTION
  private getChartData() {
    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.data = chartData[this.currentCurrency.toLocaleLowerCase()]
        this.handlePieChartData()
      }
    )
  }


  // CHART SECTION
  private handlePieChartData() {

    if (this.data) {
      this.data.map((dot: ChartDotModel) => {
        this.pieChartData.push(dot.data)
        this.pieChartLabels.push(dot.label)
      })
    }
  }


  // LOGIC SECTION


  private cleanChartData() {
    this.pieChartData = []
    this.pieChartLabels = []
  }


}
