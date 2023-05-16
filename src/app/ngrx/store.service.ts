import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store"
import { Observable, switchMap } from "rxjs"
import { CoinsActions, CoinsSelectors } from "./coins/coins.types"
import { Coin } from "../models/coin.model"

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



}
