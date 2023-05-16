import { Component, EventEmitter, Input, Output, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoinModel } from 'src/app/models/coin.model';
import { CoinsInfoComponent } from '../coins-info/coins-info.component';
import { CurrencyModel } from 'src/app/models/currency.model';
import { CoinsService } from '../coins.service';


export interface PanelOpenEvent {
  open: boolean;
  panelId: string
}

@Component({
  selector: 'app-coins-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CoinsInfoComponent],
  templateUrl: './coins-panel.component.html',
  styleUrls: ['./coins-panel.component.scss']
})
export class CoinsPanelComponent {

  @Input() coin!: CoinModel

  coinsService: CoinsService = inject(CoinsService)

  // info!: Signal<CurrencyModel | undefined>

  info!: CurrencyModel

  onOpenedEvent() {
    this.coinsService.getCoinCurrency(this.coin.id).subscribe((data: CurrencyModel) => {

      this.info = data
    });
  }

}
