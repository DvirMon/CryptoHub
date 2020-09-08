import { Component, Input, OnInit } from '@angular/core';


import { CoinsService } from 'src/app/services/coins.service';
import { DialogService } from 'src/app/services/dialog.service';

import { CoinModel } from 'src/app/utilities/models/coin-model';


import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-item',
  templateUrl: './coins-item.component.html',
  styleUrls: ['./coins-item.component.scss']
})
export class CoinsItemComponent implements OnInit {

  @Input() coin: CoinModel

  private selectedCoins: string[] = []
  public checked: boolean

  constructor(
    private coinsService: CoinsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
    this.subscribeToSubject()
    this.handleCoinChecked()
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.selectedCoins = store.getState().coins.selectedCoins
    })
    this.selectedCoins = store.getState().coins.selectedCoins
  }

  private subscribeToSubject() {
    this.coinsService.toggleSubject.subscribe(
      (data) => {
        if (this.coin.symbol === data.coin) {
          this.checked = false
        }
        if (this.coin.symbol === data.lastSelect) {
          this.checked = true
        }
      }
    )
  }

  // LOGIC SECTION

  public handleToggle(event) {

    if (this.selectedCoins.length >= 5 && event.checked) {

      this.handleCoinsDialog()
      event.source.checked = false

    } else {
      event.checked
        ? this.coinsService.addSelectedCoin(this.coin.symbol)
        : this.coinsService.deleteSelectedCoin(this.coin.symbol)
    }
  }

  // checked selected coins after refresh

  private handleCoinChecked() {

    this.selectedCoins.map(coinId => {

      if (coinId === this.coin.symbol) {
        this.checked = true
      }

    })
  }


  // DIALOG COINS SECTION

  private handleCoinsDialog() {
    const payload = { coins: [...this.selectedCoins], lastSelect: this.coin.symbol }
    this.dialogService.handleCoinsDialog(payload)

  }




}
