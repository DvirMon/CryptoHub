import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ChartData, ChartService } from 'src/app/services/chart.service';

import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';

import { store } from 'src/app/utilities/redux/store';

import { Observable, of } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent  {

  // GRID PARAMS

  public isMobile: Observable<boolean> = this.formService.isMobile()

  public cardsMobile : ChartCardModel[] = [
    { title: 'Coins Real-Time Market Price', type: 'line', cols: 1, rows: 6 },
  ];

  public cardsDesk : ChartCardModel[] = [
    { title: 'Coins Real-Time Market Price', type: 'line', cols: 2, rows: 6 },
    { title: 'Coins Market Value', type: 'pie', cols: 1, rows: 3 },
    { title: 'Coin Market Price History', type: 'history', cols: 3, rows: 4 },
  ];


  constructor(
    private formService : FormService
  ) {
  }













}
