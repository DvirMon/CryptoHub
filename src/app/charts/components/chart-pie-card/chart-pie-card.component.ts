import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-chart-pie-card',
  templateUrl: './chart-pie-card.component.html',
  styleUrls: ['./chart-pie-card.component.scss']
})

export class ChartPieCardComponent implements OnInit {

  @Input() data: ChartDotModel[]
  @Input() pieChartLabels: Label[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  }

  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [
    {
      labels: {
        render: 'value'
      }
    }

  ];


  constructor(
  ) { }

  ngOnInit() {

    // this.subscribeToStore()
    this.handlePieChartData()

  }


  private subscribeToStore() {
    store.subscribe(
      () => {
        this.pieChartLabels = store.getState().coins.selectedCoins
      }
    )
    this.pieChartLabels = store.getState().coins.selectedCoins
  }


  private handlePieChartData() {
    this.data.map(dot => {
      this.pieChartData.push(dot.data)
    })
  }


}
