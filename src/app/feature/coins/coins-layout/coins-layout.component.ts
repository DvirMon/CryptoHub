import { Component, Signal, inject,  signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { CoinsPanelComponent, PanelChangedEvent } from '../coins-panel/coins-panel.component';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';
import { StoreService } from 'src/app/ngrx/store.service';

@Component({
  selector: 'app-coins-layout',
  standalone: true,
  imports: [CommonModule, CoinsPanelComponent],
  templateUrl: './coins-layout.component.html',
  styleUrls: ['./coins-layout.component.scss']
})
export class CoinsLayoutComponent {

  private storeService: StoreService = inject(StoreService);

  private coins$: Observable<Coin[]> = this.storeService.getCoins$()
  readonly coins: Signal<Coin[]> = toSignal(this.coins$, { initialValue: [] });

  private currencyMap$ = this.storeService.getCurrencyMap$()
  readonly currencyMap: Signal<{ [key: string]: Currency }> = toSignal(this.currencyMap$, { initialValue: {} });

  readonly selectedId: WritableSignal<string | undefined> = signal(undefined)

  constructor() {

  }


  onExpandChanged(event: PanelChangedEvent): void {

    const { coin } = event
    if (!this.currencyMap()[coin.id]) {
      this.storeService.setCurrencyMap(coin.id)
    }
  }

  onSelectedChanged(event: PanelChangedEvent): void {

    const { checked, coin } = event;
    this.storeService.setSelectedMap(checked, coin);
  }

}
