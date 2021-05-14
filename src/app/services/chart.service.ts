import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// IMPORT MODELS
import { CoinModel } from '../utilities/models/coin.model';
import { MarketHistoryModel } from '../utilities/models/market-history.model';
import { ChartDotModel } from '../utilities/models/chart-dot.model';

// IMPORT REDUX AND RXJS
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CurrencyModel } from '../utilities/models/currency.model';

export interface ChartData {
  usd: ChartDotModel[],
  eur: ChartDotModel[],
  ils: ChartDotModel[],
  currencies: string[]
}

export interface MarketHistoryData {
  market_history: MarketHistoryModel[]
}

export interface ChartHistory {
  coinId: string,
  currency: string
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  public deleteCoin: Subject<CoinModel> = new Subject()
  public historyCoin: Subject<ChartHistory> = new Subject()

  public handleChartData: Subject<ChartData> = new Subject()
  public chartData$: Observable<ChartData> = this.handleChartData.asObservable()

  private url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,
  ) { }


  // POST - get currencies for chart - http://localhost:3000/api/coins/chart

  public getChartData(ids: string[]): Observable<ChartData> {
    return this.http.post<ChartData>(this.url + "/chart", { ids }, { reportProgress: true }).pipe(
      tap((data : ChartData) => {
        this.handleChartData.next(data)
      }
      )
    )

  }

  // GET - get coin market price history - http://localhost:3000/api/coins/chart

  public getCoinMarketHistory(): Observable<MarketHistoryModel> {

    return this.historyCoin.pipe(
      switchMap((history: ChartHistory) => {
        return this.http.get<MarketHistoryModel>(this.url + "/market/history/" + `${history.coinId}/${history.currency}`,
          { reportProgress: true })
      }))
  }

  // GET - get currencies of coin by id - http://localhost:3000/api/coins/currency:id

  public getCoinCurrency(id: string): Observable<CurrencyModel> {

    return this.http.get<CurrencyModel>(this.url + "/currency/" + id, { reportProgress: true })

  }

}
