import { Injectable, Signal } from "@angular/core"
import { toSignal } from '@angular/core/rxjs-interop'
import { Store } from "@ngrx/store"
import { Observable, map, switchMap } from "rxjs"
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

  getCoins$(): Observable<Coin[]> {

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

  setSelectedCoin(id: string): void {
    console.log('called')
    const action = CoinsActions.selectedCoinId({ id });
    this.store.dispatch(action);

  }

  getCurrencyMap(): Observable<{ [key: string]: Currency }> {


    const selectedId$ = this.store.select(CoinsSelectors.selectCoinsId)

    const currencyMap$ = this.store.select(CoinsSelectors.selectCurrencyMap)

    const updateCurrencyMap$ = selectedId$.pipe(
      switchMap((id: string) => currencyMap$.pipe(
        map((currencyMap) => !!currencyMap[id]),
        switchMap((empty: boolean) => {

          if (!empty && id) {

            const action = CoinsActions.updateCoinCurrency({ id });
            this.store.dispatch(action);
          }

          return this.store.select(CoinsSelectors.selectCurrencyMap)
        })
      )
      )
    )

    return updateCurrencyMap$


  }





}
