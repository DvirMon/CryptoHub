import { Component } from '@angular/core';

import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';

import { Observable, of } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent {

  // GRID PARAMS

  public isMobile: Observable<boolean> = this.formService.isMobile()

  public cardMobile: ChartCardModel = ChartCardModel.create(
    {
      title: 'Coins Real-Time Market Price',
      type: 'line',
      cols: 1,
      rows: 6,
      // currentCoin: "BTC",
      currentCurrency: "USD"
    })

  public cardsDesk: ChartCardModel[] = [
    ChartCardModel.create(
      {
        title: 'Coins Real-Time Market Price',
        type: 'line',
        cols: 2,
        rows: 6,
        // currentCoin: "BTC",
        currentCurrency: "USD"
      }),
    ChartCardModel.create(
      {
        title: 'Coins Market Value',
        type: 'pie',
        cols: 1,
        rows: 3,
        // currentCoin: "BTC",
        currentCurrency: "USD"
      }),
    ChartCardModel.create(
      {
        title: 'Coin Market Price History',
        type: 'history',
        cols: 3,
        rows: 4,
        currentCoin: "BTC",
        currentCurrency: "USD"
      }),
  ];


  constructor(
    private formService: FormService
  ) {
  }













}
