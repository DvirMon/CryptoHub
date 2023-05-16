import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsService } from '../coins.service';
import { CoinsPanelComponent } from '../coins-panel/coins-panel.component';
import { Observable } from 'rxjs';
import { CurrencyModel } from 'src/app/models/currency.model';
import { CoinModel } from 'src/app/models/coin.model';
import { CoinsInfoComponent } from '../coins-info/coins-info.component';

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



}
