import { Injectable, Signal } from "@angular/core"
import { toSignal } from '@angular/core/rxjs-interop'
import { Store } from "@ngrx/store"
import { Observable, combineLatestWith, distinctUntilChanged, map, switchMap } from "rxjs"
import { CoinsActions, CoinsSelectors } from "./coins/coins.types"
import { Coin } from "../models/coin.model"
import { Currency } from "../models/currency.model"

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store
  ) { }

  public getCoins$(): Observable<Coin[]> {

    const loaded$ = this.store.select(CoinsSelectors.selectCoinsLoaded)

    const loadCoins$ = loaded$.pipe(
      switchMap((loaded) => {
        if (!loaded) {
          this.store.dispatch(CoinsActions.loadCoins())
        }
        return this.store.select(CoinsSelectors.selectAllCoins)
      })
    )

    return loadCoins$

  }

  public getCurrencyMap$(): Observable<{ [key: string]: Currency }> {
    return this.store.select(CoinsSelectors.selectCurrencyMap)
  }

  public getSelectedCoin$(): Observable<string> {
    return this.store.select(CoinsSelectors.selectCoinsId).pipe(distinctUntilChanged())
  }

  public setCurrencyMap(id: string): void {
    const action = CoinsActions.updateCoinCurrency({ id });
    this.store.dispatch(action);
  }

  public setSelectedMap(checked: boolean, coin: Coin) {

    if (checked) {
      const action = CoinsActions.addSelectedCoin({ coin });
      this.store.dispatch(action);
    }

    else {
      const action = CoinsActions.deleteSelectedCoin({ id: coin.id });
      this.store.dispatch(action);

    }

  }





}
