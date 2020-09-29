import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartDotModel } from '../utilities/models/chart-dot.model';

import { environment } from 'src/environments/environment';

import { Observable, Subject } from 'rxjs';
import { store } from '../utilities/redux/store';
import { tap } from 'rxjs/operators';
import { CoinModel } from '../utilities/models/coin.model';
import { MarketHistoryModel } from '../utilities/models/market-history.model';

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
 
  public url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,

  ) { }


  // POST - get currencies for chart - http://localhost:3000/api/coins/chart
  
  public getChartData(ids : string[]): Observable<ChartData> {
    return this.http.post<ChartData>(this.url + "/chart", { ids }, { reportProgress: true })
    
  }
  
  // GET - get coin market price history - http://localhost:3000/api/coins/chart

  public getCoinMarketHistory(coinId: string): Observable<MarketHistoryModel> {
    return this.http.get<MarketHistoryModel>(this.url + "/market/history/" + coinId, { reportProgress: true })

  }
}
