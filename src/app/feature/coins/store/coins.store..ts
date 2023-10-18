import { Injectable, Signal } from "@angular/core"
import { Store } from "@ngrx/store"
import { ComponentType } from "@angular/cdk/portal"
import { Coin, CoinSearchResult, Currency } from "./coin.model";
import { CoinAPIActions, CoinDialogActions } from "./coins.actions";
import { CoinSelector } from "./coins.selectors";

@Injectable({
  providedIn: 'root'
})
export class CoinStore {

  constructor(
    private store: Store
  ) { }

  public selectLoaded(): Signal<boolean> {
    return this.store.selectSignal(CoinSelector.selectCoinsLoaded);
  }


  public getCoins(): Signal<Coin[]> {

    const loaded = this.store.selectSignal(CoinSelector.selectCoinsLoaded);


    if (!loaded()) {
      this.store.dispatch(CoinAPIActions.loadCoins())
    }

    return this.store.selectSignal(CoinSelector.selectAllCoins);
  }

  public getCurrencyMap(): Signal<Record<string, Currency>> {
    return this.store.selectSignal(CoinSelector.selectCurrencyMap)
  }

  public getSelectedCoinMap(): Signal<Record<string, boolean>> {
    return this.store.selectSignal(CoinSelector.selectCoinsMap)
  }

  public getSelectedCoinsAmount(): Signal<number> {
    return this.store.selectSignal(CoinSelector.selectCoinsAmount)
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


  public loadCoinSearchResults(searchTerm: string): void {
    const action = CoinAPIActions.loadSearchCoin({ searchTerm });
    this.store.dispatch(action);
  }

  public getCoinSearchResults(): Signal<CoinSearchResult[]> {
    return this.store.selectSignal(CoinSelector.selectSearchResults);
  }

  public clearCoinSearchResults(): void {
    const action = CoinAPIActions.clearSearchCoins();
    this.store.dispatch(action);
  }


  // DIALOG ACTIONS

  public openDialog(component: () => ComponentType<unknown>, data?: unknown): void {
    const action = CoinDialogActions.dialogOpened({ component, data });
    this.store.dispatch(action);
  }

  public onDialogClosed(data: Record<string, boolean>) {
    const action = CoinDialogActions.dialogClosed({ data });
    this.store.dispatch(action);
  }

  public onDialogSaved(data: unknown): void {
    const action = CoinDialogActions.dialogSaved({ data });
    this.store.dispatch(action);
  }


}
