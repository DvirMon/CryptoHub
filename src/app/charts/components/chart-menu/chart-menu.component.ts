import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { CoinModel } from 'src/app/utilities/models/coin.model';

import { faCoins } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-chart-menu',
  templateUrl: './chart-menu.component.html',
  styleUrls: ['./chart-menu.component.scss']
})
export class ChartMenuComponent implements OnInit {

  @Input() card: ChartCardModel
  @Input() selectedCoins: CoinModel[]
  @Input() currencies: string[]

  @Output() changeCoin: EventEmitter<{ type: string, coin : string }> = new EventEmitter()
  @Output() changeCurrency: EventEmitter<{ type: string, currency : string }> = new EventEmitter()

  public faIcon = faCoins;

  constructor() { }

  ngOnInit(): void {
  }

  // LOGIC SECTION
  public handleCurrencyChange(type: string, currency : string) {
    this.changeCurrency.emit({ type, currency })
  }

  public handleCoinChange(type: string , coin : string) {
    this.changeCoin.emit({ type, coin })
  }


}
