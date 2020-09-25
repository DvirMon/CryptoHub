import { Component, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-menu',
  templateUrl: './coins-menu.component.html',
  styleUrls: ['./coins-menu.component.scss']
})
export class CoinsMenuComponent implements OnInit {

  public selectedCoins: CoinModel[] = []

  constructor(
    private coinsService: CoinsService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  // SUBSCRIPTION SECTION
  
  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
      }
      )
      this.selectedCoins = store.getState().coins.selectedCoins
  }
  
  // LOGIC SECTION

  public deleteCoins() {
    this.coinsService.deleteAllSelectedCoin()
  }

}
