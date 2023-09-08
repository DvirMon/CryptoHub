import { Injectable, Signal } from "@angular/core"
import { toSignal } from '@angular/core/rxjs-interop'
import { Store } from "@ngrx/store"
import { ComponentType } from "@angular/cdk/portal"
import { CoinAPIActions, CoinDialogActions } from "./coins/coins.actions"
import { CoinSelector } from "./coins/coins.selectors"
import { Coin, Currency } from "./coins/coin.model"
import { Observable, switchMap } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store
  ) { }

  public getCoins$(): Observable<Coin[]> {

    const loaded$ = this.store.select(CoinSelector.selectCoinsLoaded)

    const loadCoins$ = loaded$.pipe(
      switchMap((loaded) => {
        if (!loaded) {
          this.store.dispatch(CoinAPIActions.loadCoins())
        }
        return this.store.select(CoinSelector.selectAllCoins)
      })
    )

    return loadCoins$

  }

  public getCurrencyMap$(): Observable<{ [key: string]: Currency }> {
    return this.store.select(CoinSelector.selectCurrencyMap)
  }

  public getSelectedCoinMap(): Signal<{ [key: string]: boolean }> {
    const selectedCoinsMap$ = this.store.select(CoinSelector.selectCoinsMap)
    return toSignal(selectedCoinsMap$, { initialValue: {} })

  }

  public getSelectedCoinsAmount(): Signal<number> {
    const selectedCoinsAmount$ = this.store.select(CoinSelector.selectCoinsAmount)
    return toSignal(selectedCoinsAmount$, { initialValue: 0 })
  }

  public setCurrencyMap(id: string): void {
    const action = CoinAPIActions.updateCoinCurrency({ id });
    this.store.dispatch(action);
  }

  public setSelectedMap(checked: boolean, coinId: string): void {

    if (checked) {
      const action = CoinAPIActions.addSelectedCoin({ coinId, checked });
      this.store.dispatch(action);
    }

    else {
      const action = CoinAPIActions.deleteSelectedCoin({ id: coinId });
      this.store.dispatch(action);

    }

  }

  // DIALOG ACTIONS

  public openDialog(component: () => ComponentType<unknown>, data?: unknown): void {
    const action = CoinDialogActions.dialogOpened({ component, data });
    this.store.dispatch(action);
  }

  public onDialogClosed(data: { [key: string]: boolean }) {
    const action = CoinDialogActions.dialogClosed({ data });
    this.store.dispatch(action);
  }

  public onDialogSaved(data: unknown): void {
    const action = CoinDialogActions.dialogSaved({ data });
    this.store.dispatch(action);
  }


}
