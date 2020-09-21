import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';

@Component({
  selector: 'app-chart-pie-card',
  templateUrl: './chart-pie-card.component.html',
  styleUrls: ['./chart-pie-card.component.scss']
})

export class ChartPieCardComponent implements OnInit {

  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective;


  @Input() data: ChartDotModel[]
  @Input() pieChartLabels: Label[] = [];


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
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public label: any
  public currency: any



  constructor(
    private formService: FormService
  ) { }

  ngOnInit() {

    this.handlePieChartData()
    this.setStartData()

  }

  // CHART SECTION
  private handlePieChartData() {
    this.data.map(dot => {
      this.pieChartData.push(dot.data)
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

}
