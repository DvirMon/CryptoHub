import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CoinModel } from '../models/coin-model';
import { CoinsService } from 'src/app/services/coins.service';

import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Observable<CoinModel[]> | Promise<CoinModel[]> | CoinModel[]>{

  constructor(
    private coinsService: CoinsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CoinModel[]> | Promise<CoinModel[]> | CoinModel[] {

    if (store.getState().coins.coins.length === 0) {
      this.coinsService.getCoins(1)
    }

    return store.getState().coins.coins
  }
}
