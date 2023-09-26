import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsDialogComponent } from 'src/app/feature/coins/coins-dialog/coins-dialog.component';
import { Coin, Currency } from 'src/app/feature/coins/store/coin.model';
import { CoinStore } from 'src/app/feature/coins/store/coins.store.';
import { CoinsItemComponent, ExpandChangedEvent, CheckedChangedEvent } from 'src/app/feature/coins/coins-item/coins-item.component';
import { COINS_SELECT_LIMIT } from 'src/app/shared/constants';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoinsItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private coinStore: CoinStore = inject(CoinStore);

  public readonly coins: Signal<Coin[]> = this.coinStore.getCoins()
  public readonly currencyMap: Signal<Record<string, Currency>> = this.coinStore.getCurrencyMap()

  public readonly selectedId: WritableSignal<string | undefined> = signal(undefined);

  public readonly selectedMap: Signal<Record<string, boolean>> = this.coinStore.getSelectedCoinMap();
  public readonly selectedCoinsAmount: Signal<number> = this.coinStore.getSelectedCoinsAmount();

  public readonly toggleLimit = this.setToggleLimit(COINS_SELECT_LIMIT, this.selectedCoinsAmount);


   onExpandChanged(event: ExpandChangedEvent): void {

    const { coinId } = event
    if (!this.currencyMap()[coinId]) {
      this.coinStore.setCurrencyMap(coinId)
    }
  }

  onCheckedChanged(event: CheckedChangedEvent): void {
    const { checked, coinId } = event;
    this.coinStore.setSelectedMap(checked, coinId);

  }

  onToggleLimit(): void {
    this.coinStore.openDialog(() => CoinsDialogComponent)
  }

  private setToggleLimit(limit: number, length: Signal<number>): Signal<boolean> {
    return computed(() => limit > length())
  }

}
