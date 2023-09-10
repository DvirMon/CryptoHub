import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckedChangedEvent, CoinsPanelComponent, ExpandChangedEvent } from 'src/app/feature/coins/coins-panel/coins-panel.component';
import { CoinsDialogComponent } from 'src/app/feature/coins/coins-dialog/coins-dialog.component';
import { Coin, Currency } from 'src/app/ngrx/coins/coin.model';
import { StoreService } from 'src/app/ngrx/store.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CoinsPanelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private storeService: StoreService = inject(StoreService);

  readonly coins: Signal<Coin[]> = this.storeService.getCoins()
  readonly currencyMap: Signal<Record<string, Currency>> = this.storeService.getCurrencyMap()

  readonly selectedId: WritableSignal<string | undefined> = signal(undefined);

  readonly selectedMap: Signal<Record<string, boolean>> = this.storeService.getSelectedCoinMap();
  readonly selectedCoinsAmount: Signal<number> = this.storeService.getSelectedCoinsAmount();

  readonly toggleLimit = this.setToggleLimit(3, this.selectedCoinsAmount);


   onExpandChanged(event: ExpandChangedEvent): void {

    const { coinId } = event
    if (!this.currencyMap()[coinId]) {
      this.storeService.setCurrencyMap(coinId)
    }
  }

  onCheckedChanged(event: CheckedChangedEvent): void {

    const { checked, coinId } = event;

    this.storeService.setSelectedMap(checked, coinId);

  }

  onToggleLimit(): void {

    this.storeService.openDialog(() => CoinsDialogComponent)
  }

  private setToggleLimit(limit: number, length: Signal<number>): Signal<boolean> {
    return computed(() => limit > length())
  }

}
