import { Component, Input, OnInit } from '@angular/core';
import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  @Input() card: ChartCardModel;


  constructor() { }

  ngOnInit(): void {
    console.log("call chart.card")
  }

  

}
