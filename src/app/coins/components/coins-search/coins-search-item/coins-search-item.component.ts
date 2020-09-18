import { Component, Input, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { CurrencyModel } from 'src/app/utilities/models/currency-model';

@Component({
  selector: 'app-coins-search-item',
  templateUrl: './coins-search-item.component.html',
  styleUrls: ['./coins-search-item.component.scss']
})
export class CoinsSearchItemComponent implements OnInit {

  @Input() coin: CoinModel
  public panelOpenState: boolean = false;


  private data: boolean = false

  constructor(
    private coinsService: CoinsService,
    public currency: CurrencyModel
  ) { }

  ngOnInit(): void {
  }

  public togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }

  public getCoinData() {


    if (this.data) {
      return
    }


    this.coinsService.getCoinCurrency(this.coin.id).subscribe(
      (currency) => {
        this.currency = currency
        this.data = true
      }
    )
  }





}
