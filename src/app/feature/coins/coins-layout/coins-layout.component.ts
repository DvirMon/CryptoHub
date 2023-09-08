import { Component, Signal, inject, signal, WritableSignal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { CheckedChangedEvent, CoinsPanelComponent, ExpandChangedEvent } from '../coins-panel/coins-panel.component';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/ngrx/store.service';
import { CoinsDialogComponent } from '../coins-dialog/coins-dialog.component';
import { Coin, Currency } from 'src/app/ngrx/coins/coin.model';

@Component({
  selector: 'app-coins-layout',
  standalone: true,
  imports: [CommonModule, CoinsPanelComponent],
  templateUrl: './coins-layout.component.html',
  styleUrls: ['./coins-layout.component.scss'],
})
export class CoinsLayoutComponent {

  private storeService: StoreService = inject(StoreService);

  private coins$: Observable<Coin[]> = this.storeService.getCoins$();
  readonly coins: Signal<Coin[]> = toSignal(this.coins$, { initialValue: [] });

  private currencyMap$ = this.storeService.getCurrencyMap$()
  readonly currencyMap: Signal<{ [key: string]: Currency }> = toSignal(this.currencyMap$, { initialValue: {} });

  readonly selectedId: WritableSignal<string | undefined> = signal(undefined);

  readonly selectedMap: Signal<{ [key: string]: boolean }> = this.storeService.getSelectedCoinMap();
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
