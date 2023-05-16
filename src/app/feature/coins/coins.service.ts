import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CoinModel } from 'src/app/models/coin.model';
import { CurrencyModel } from 'src/app/models/currency.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  private url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,
    // private formService: FormService,
  ) { }

  // HTTP SECTION


  // Get coins by pagination

  public getCoins(): Observable<CoinModel[]> {
    return this.http.get<CoinModel[]>(this.url)
  }

  // POST request - get coins pagination - http://localhost:3000/api/coins

  private getCoinsPage(params: any): Observable<CoinModel[]> {
    return this.http.get<CoinModel[]>(this.url)
  }

  // GET - get currencies of coin by id - http://localhost:3000/api/coins/currency:id

  public getCoinCurrency(id: string): Observable<CurrencyModel> {
    return this.http.get<CurrencyModel>(this.url + "/currency/" + id, { reportProgress: true })

  }



  // STORE SECTION

  // public addSelectedCoin(coin: CoinModel) {
  //   this.formService.handleStore(ActionType.AddCoin, coin)
  // }

  // public deleteSelectedCoin(coinId: string) {
  //   this.formService.handleStore(ActionType.DeleteCoin, coinId)
  // }
  // public deleteAllSelectedCoin() {
  //   this.formService.handleStore(ActionType.DeleteAllCoins)
  // }


}
