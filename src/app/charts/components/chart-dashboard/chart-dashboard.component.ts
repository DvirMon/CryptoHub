import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { CardGridModel } from 'src/app/utilities/models/card-grid.mode';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { store } from 'src/app/utilities/redux/store';
import { CoinModel } from 'src/app/utilities/models/coin.model';


@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit {


  public cols: Observable<number> = this.formService.isHandset().pipe(
    map(({ matches }) => {
      if (matches) {
        return 1
      }
      return 3
    }))


  public cards = this.formService.isHandset().pipe(
    map(({ matches }) => {

      if (matches) {
        return this.cardsMobileGrid
      }
      return this.cardsWebGrid
    })
  );

  public serverData: ChartDotModel[] = []
  public selectedCoins: CoinModel[] = []

  private cardsMobileGrid: CardGridModel[] = [
    { title: 'Card 1', type: 'chart-line', cols: 1, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 1 },
    { title: 'Card 4', type: 'chart', cols: 1, rows: 1 },
  ];

  private cardsWebGrid: CardGridModel[] = [
    { title: 'Real-Time Coins Currency Data', type: 'chart-line', cols: 2, rows: 2 },
    { title: 'Selected Coins Currencies', type: 'chart-bar', cols: 1, rows: 1 },
    { title: 'Coins Value By Currency', type: 'chart-pie', cols: 1, rows: 1 },
    { title: 'Card 4', type: 'chart', cols: 3, rows: 1 },
  ];

  constructor(
    private chartService: ChartService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.getChartData()
    this.subscribeToStore()
  }


  private getChartData() {
    this.chartService.getChartData().subscribe(
      (serverData: ChartData) => {
        this.serverData = serverData.usd

      }
    )
  }

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
      }
    )
    this.selectedCoins = store.getState().coins.selectedCoins
  }






}
