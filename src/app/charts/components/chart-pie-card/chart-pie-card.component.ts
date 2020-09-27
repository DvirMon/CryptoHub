import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

export class ChartPieCardComponent implements OnInit {

  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective;

  @Input() data: ChartDotModel[]
  @Input() currentCurrency: string

  public cols: Observable<number> = this.formService.isHandset().pipe(
    map(({ matches }) => {
      if (matches) {
        return 1
      }
      return 2
    }))


  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public pieChartData: SingleDataSet = [];
  public pieChartLabels: Label[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public label: any
  public currency: any

  private ids: string[] = []


  constructor(
    private formService: FormService,
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.subscribeToStore()
    this.handlePieChartData()
    this.setStartData()
    this.subscribeToCoinDelete()
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
        console.log(chartData)
        this.data = chartData[this.currentCurrency.toLocaleLowerCase()]
        this.handlePieChartData()
      }
    )
  }


  // CHART SECTION
  private handlePieChartData() {
    this.data.map(dot => {
      this.pieChartData.push(dot.data)
      this.pieChartLabels.push(dot.label)
    })
  }


  // LOGIC SECTION
  public handlePieSection(event?) {

    if (event.active[0]) {
      const index = event.active[0]._index
      this.label = this.pieChartLabels[index]
      this.currency = this.pieChartData[index]

    }

  }

  private setStartData() {
    this.label = this.pieChartLabels[0]
    this.currency = this.pieChartData[0]
  }

  private cleanChartData() {
    this.pieChartData = []
    this.pieChartLabels = []
  }


}
