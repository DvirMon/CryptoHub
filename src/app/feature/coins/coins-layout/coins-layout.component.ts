import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { CoinsService } from '../coins.service';
import { CoinsPanelComponent, PanelChangedEvent } from '../coins-panel/coins-panel.component';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/models/coin.model';
import { CoinsInfoComponent } from '../coins-info/coins-info.component';
import { Currency } from 'src/app/models/currency.model';

@Component({
  selector: 'app-coins-layout',
  standalone: true,
  imports: [CommonModule, CoinsPanelComponent, CoinsInfoComponent],
  templateUrl: './coins-layout.component.html',
  styleUrls: ['./coins-layout.component.scss']
})
export class CoinsLayoutComponent {

  coinsService: CoinsService = inject(CoinsService)

  coins$: Observable<Coin[]> = this.coinsService.getCoins();
  coins: Signal<Coin[]> = toSignal(this.coins$, { initialValue: [] });

  infoMap: Map<string, Currency> = new Map<string, Currency>();

  onExpandChanged(event: PanelChangedEvent) {

    const { panelId } = event
    this.coinsService.getCoinCurrency(panelId).subscribe((data: Currency) => {
      this.infoMap.set(panelId, data)
    });
  }

}
