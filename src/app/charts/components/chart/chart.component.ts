import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public data : ChartDotModel[] = [];

  constructor(
    private chartService : ChartService
  ) { }

  ngOnInit(): void {
  }

}
