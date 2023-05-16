import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { CoinsService } from '../coins.service';
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

  coinsService: CoinsService = inject(CoinsService);
  StoreService : StoreService = inject(StoreService);

  coins$: Observable<Coin[]> = this.StoreService.getCoins$()
  coins: Signal<Coin[]> = toSignal(this.coins$, { initialValue: [] });

  currencyMap: Map<string, Currency> = new Map<string, Currency>();

  onExpandChanged(event: PanelChangedEvent) {

    const { panelId } = event
    this.coinsService.getCoinCurrency(panelId).subscribe((data: Currency) => {
      this.currencyMap.set(panelId, data)
    });
  }

}
