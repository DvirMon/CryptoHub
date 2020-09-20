import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-chart-line-card',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class ChartLineCardComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() selectedCoins: string[] = []


  // CHART PARAMS
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { //you're missing this
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Coin Currency $'
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
      (label: string) => {
        return new ChartDotModel(label, [0])
      }
    )

    this.lineChartLabels.push(new Date().toLocaleTimeString())


  }

  // HTTP SECTION

  private getChartData() {
    this.chartService.getChartData().subscribe(
      (serverData: ChartData) => {
        this.data = serverData.usd
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
