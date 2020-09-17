import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoinModel } from '../utilities/models/coin-model';
import { CurrencyModel } from '../utilities/models/currency-model';
import { FormService } from './form.service';
import { SortService } from './sort.service';

import { ActionType } from '../utilities/redux/action-type';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';



export interface SearchData {
  coins: CoinModel[],
  entries: number
}

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  public toggleSubject: Subject<{ coin: string, lastSelect: string }> = new Subject()
  public url: string = environment.server + '/api/coins'


  constructor(
    private http: HttpClient,
    private formService: FormService,
    private sortService: SortService,
    private loaderService: LoaderService

  ) { }

  // HTTP SECTION


  // POST request - get coins pagination

  private coinsData(page: number) {

    const params = {
      page,
      per_page: 48
    }

    return this.http.post<CoinModel[]>(this.url, params, { reportProgress: true })
  }

  // GET - get currencies of coin by id
  public getCoinCurrency(id: string): Observable<CurrencyModel> {

    return this.http.get<CurrencyModel>(this.url + "/currency/" + id, { reportProgress: true })

  }

  // GET request - get coins by search
  public searchCoins(): Observable<CoinModel[]> {

    return this.http.get<CoinModel[]>(this.url, { reportProgress: true })
      .pipe(
        map((coins: CoinModel[]) => {

          return this.sortService.getSortedData(coins)
        })
      )
  }

  // LOGIC SECTION

  public getCoins(page: number) {
    this.coinsData(page).subscribe(
      (coins) => {
        this.formService.handleStore(ActionType.GetPageCoins, coins)
        // this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      },
      () => {
        // this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      }
    )
  }


  public getNextCoins(page: number) {
    this.coinsData(page).subscribe(
      (coins) => {
        this.formService.handleStore(ActionType.AddPageCoins, coins)
        // this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      },
      () => {
        // this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      }
    )
  }

  // STORE SECTION

  public addSelectedCoin(coinId: string) {
    this.formService.handleStore(ActionType.AddCoin, coinId)
  }

  public deleteSelectedCoin(coinId: string) {
    this.formService.handleStore(ActionType.DeleteCoin, coinId)
  }

}
