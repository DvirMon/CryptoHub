import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartDotModel } from '../utilities/models/chart-dot.model';

import { environment } from 'src/environments/environment';

import { Observable, Subject } from 'rxjs';
import { store } from '../utilities/redux/store';
import { map, tap } from 'rxjs/operators';
import { CoinModel } from '../utilities/models/coin.model';
import { MarketHistoryModel } from '../utilities/models/market-history.model';
import { FormService } from './form.service';
import { ChartCardModel } from '../utilities/models/chart-card.mode';

export interface ChartData {
  usd: ChartDotModel[],
  eur: ChartDotModel[],
  ils: ChartDotModel[],
  currencies: string[]
}

export interface MarketHistoryData {
  market_history: MarketHistoryModel[]
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public deleteCoin: Subject<CoinModel> = new Subject()
  public historyCoin: Subject<string> = new Subject()


  // GRID PARAMS
  public cards: Observable<ChartCardModel[]> = this.formService.isHandset().pipe(
    map(({ matches }) => {

      if (matches) {
        return this.cardsMobileGrid
      }
      return this.cardsWebGrid
    })
  );

  public cols: Observable<number> = this.formService.isHandset().pipe(
    map(({ matches }) => {
      if (matches) {
        return 1
      }
      return 3
    }))



  private cardsMobileGrid: ChartCardModel[] = [
    { title: 'Coins Real-Time Market Price', type: 'line', cols: 1, rows: 6 },
  ];

  private cardsWebGrid: ChartCardModel[] = [ 
    { title: 'Coins Real-Time Market Price', type: 'line', cols: 2, rows: 5 },
    { title: 'Coin Currencies', type: 'doughnut', cols: 1, rows: 3 },
    { title: 'Coins Market Value', type: 'pie', cols: 1, rows: 3 },
    { title: 'Coin Market Price History', type: 'history', cols: 3, rows: 3 },
  ];

  private url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,
    private formService: FormService



  ) { }


  // POST - get currencies for chart - http://localhost:3000/api/coins/chart

  public getChartData(ids: string[]): Observable<ChartData> {
    return this.http.post<ChartData>(this.url + "/chart", { ids }, { reportProgress: true })

  }

  // GET - get coin market price history - http://localhost:3000/api/coins/chart

  public getCoinMarketHistory(coinId: string): Observable<MarketHistoryModel> {
    return this.http.get<MarketHistoryModel>(this.url + "/market/history/" + coinId, { reportProgress: true })

  }
}
