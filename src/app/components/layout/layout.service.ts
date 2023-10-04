import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { CoinStore } from 'src/app/feature/coins/store/coins.store.';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private showToolbarSignal: WritableSignal<boolean> = signal(true);
  private coinStore: CoinStore = inject(CoinStore);

  public getToolbarSignal(): WritableSignal<boolean> {
    return this.showToolbarSignal
  }

  public setToolbarSignal(value: boolean): void {
    this.showToolbarSignal.set(value)
  }

  public getSelectedCoinsAmount(): Signal<number> {
    return this.coinStore.getSelectedCoinsAmount()
  }

  public clearSearchCoins(): void {
    this.coinStore.clearCoinSearchResults()
  }
}
