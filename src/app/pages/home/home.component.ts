import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsDialogComponent } from 'src/app/feature/coins/coins-dialog/coins-dialog.component';
import { Coin, Currency } from 'src/app/feature/coins/store/coin.model';
import { CoinStore } from 'src/app/feature/coins/store/coins.store.';
import { CoinsItemComponent, ExpandChangedEvent, CheckedChangedEvent } from 'src/app/feature/coins/coins-item/coins-item.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoinsItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private coinStore: CoinStore = inject(CoinStore);

  readonly coins: Signal<Coin[]> = this.coinStore.getCoins()
  readonly currencyMap: Signal<Record<string, Currency>> = this.coinStore.getCurrencyMap()

  readonly selectedId: WritableSignal<string | undefined> = signal(undefined);

  readonly selectedMap: Signal<Record<string, boolean>> = this.coinStore.getSelectedCoinMap();
  readonly selectedCoinsAmount: Signal<number> = this.coinStore.getSelectedCoinsAmount();

  readonly toggleLimit = this.setToggleLimit(3, this.selectedCoinsAmount);


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
