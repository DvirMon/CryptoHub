import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { CoinModel } from '../utilities/models/coin.model';
import { CurrencyModel } from '../utilities/models/currency.model';
import { FormService } from './form.service';

import { ActionType } from '../utilities/redux/action-type';
import { environment } from 'src/environments/environment';
import { store } from '../utilities/redux/store';
import { ToggleService } from './toggle.service';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {


  public url: string = environment.server + '/api/coins'


  constructor(
    private http: HttpClient,
    private formService: FormService,
  ) { }

  // HTTP SECTION


  // POST request - get coins pagination - http://localhost:3000/api/coins

  public getCoins(page: number) {

    const params = {
      page,
      per_page: 48
    }

    return this.http.post<CoinModel[]>(this.url, params, { reportProgress: true }).subscribe(
      (coins: CoinModel[]) => {

        page === 1
          ? this.formService.handleStore(ActionType.GetPageCoins, coins)
          : this.formService.handleStore(ActionType.AddPageCoins, coins)
      }
    )
  }

  // GET - get currencies of coin by id - http://localhost:3000/api/coins/currency:id

  public getCoinCurrency(id: string): Observable<CurrencyModel> {

    return this.http.get<CurrencyModel>(this.url + "/currency/" + id, { reportProgress: true })

  }



  // STORE SECTION

  public addSelectedCoin(coin: CoinModel) {
    this.formService.handleStore(ActionType.AddCoin, coin)
  }
 
  public deleteSelectedCoin(coinId: string) {
    this.formService.handleStore(ActionType.DeleteCoin, coinId)
  }
  public deleteAllSelectedCoin() {
    
    this.formService.handleStore(ActionType.DeleteAllCoins)
  }


}
