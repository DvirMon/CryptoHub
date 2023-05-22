import { Injectable, Signal } from "@angular/core"
import { toSignal } from '@angular/core/rxjs-interop'
import { Store } from "@ngrx/store"
import { Observable, combineLatestWith, distinctUntilChanged, map, switchMap } from "rxjs"
import { CoinsActions, CoinsSelectors } from "./coins/coins.types"
import { Coin } from "../models/coin.model"
import { Currency } from "../models/currency.model"
import { ComponentType } from "@angular/cdk/portal"
import { CoinsDialogComponent } from "../feature/coins/coins-dialog/coins-dialog.component"
import { MatSlideToggle } from "@angular/material/slide-toggle"

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

  public getSelectedCoinMap(): Signal<{ [key: string]: boolean }> {
    const selectedCoinsMap$ = this.store.select(CoinsSelectors.selectCoinsMap)
    return toSignal(selectedCoinsMap$, { initialValue: {} })

  }

  public getSelectedCoinsAmount(): Signal<number> {
    const selectedCoinsAmount$ = this.store.select(CoinsSelectors.selectCoinsAmount)
    return toSignal(selectedCoinsAmount$, { initialValue: 0 })
  }

  public setCurrencyMap(id: string): void {
    const action = CoinsActions.updateCoinCurrency({ id });
    this.store.dispatch(action);
  }

  public setSelectedMap(checked: boolean, coinId: string): void {

    if (checked) {
      const action = CoinsActions.addSelectedCoin({ coinId, checked });
      this.store.dispatch(action);
    }

    else {
      const action = CoinsActions.deleteSelectedCoin({ id: coinId });
      this.store.dispatch(action);

    }

  }

  // DIALOG ACTIONS

  public openDialog(component: () => ComponentType<unknown>, data?: unknown): void {
    const action = CoinsActions.openCoinsDialog({ component, data });
    this.store.dispatch(action);
  }

  public onDialogClosed(data: { [key: string]: boolean }) {
    const action = CoinsActions.closedCoinsDialog({ data });
    this.store.dispatch(action);
  }

  public onDialogSaved(data: unknown): void {
    const action = CoinsActions.savedCoinsDialog({ data });
    this.store.dispatch(action);
  }


}
