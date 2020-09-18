import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-panel',
  templateUrl: './coins-panel.component.html',
  styleUrls: ['./coins-panel.component.scss']
})
export class CoinsPanelComponent implements OnInit {

  public coins: CoinModel[] = []

  constructor(
    private coinService: CoinsService,
  ) { }

  ngOnInit(): void {

    this.subscribeToStore()
    this.getCoinsData()
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.coins = store.getState().coins.coins
    })
    this.coins = store.getState().coins.coins
  }

  // LOGIC SECTION

  private getCoinsData() {

    if (this.coins.length < 13) {

      this.coinService.getCoins(1)
    }

  }


}
