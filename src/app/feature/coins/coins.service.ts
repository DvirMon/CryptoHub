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

  public getCoins(page: number) {

    const params = {
      page,
      per_page: 48
    }

    return this.getCoinsPage(params).subscribe(
      (coins: CoinModel[]) => {

        return coins

        // page === 1
        //   ? this.formService.handleStore(ActionType.GetPageCoins, coins)
        //   : this.formService.handleStore(ActionType.AddPageCoins, coins)
      }
    )
  }

  // POST request - get coins pagination - http://localhost:3000/api/coins

  private getCoinsPage(params : any): Observable<CoinModel[]> {
    return this.http.post<CoinModel[]>(this.url, params, { reportProgress: true })
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
