import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { ChartModel } from 'src/app/utilities/models/chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public data : ChartModel[] = [];

  constructor(
    private chartService : ChartService
  ) { }

  ngOnInit(): void {
  }

}
