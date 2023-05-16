import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { CoinsService } from '../coins.service';
import { CoinsPanelComponent, PanelChangedEvent } from '../coins-panel/coins-panel.component';
import { Observable } from 'rxjs';
import { CoinModel } from 'src/app/models/coin.model';
import { CoinsInfoComponent } from '../coins-info/coins-info.component';
import { CurrencyModel } from 'src/app/models/currency.model';

@Component({
  selector: 'app-coins-layout',
  standalone: true,
  imports: [CommonModule, CoinsPanelComponent, CoinsInfoComponent],
  templateUrl: './coins-layout.component.html',
  styleUrls: ['./coins-layout.component.scss']
})
export class CoinsLayoutComponent {

  coinsService: CoinsService = inject(CoinsService)

  coins$: Observable<CoinModel[]> = this.coinsService.getCoins();
  coins: Signal<CoinModel[]> = toSignal(this.coins$, { initialValue: [] });

  infoMap: Map<string, CurrencyModel> = new Map<string, CurrencyModel>();

  onExpandChanged(event: PanelChangedEvent) {

    const { panelId } = event
    this.coinsService.getCoinCurrency(panelId).subscribe((data: CurrencyModel) => {
      this.infoMap.set(panelId, data)
    });
  }

}
