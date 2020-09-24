import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';


import { CoinsService } from 'src/app/services/coins.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoaderService } from 'src/app/services/loader.service';

import { CoinModel } from 'src/app/utilities/models/coin.model';


import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-item',
  templateUrl: './coins-item.component.html',
  styleUrls: ['./coins-item.component.scss']
})
export class CoinsItemComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSlideToggle) toggle: MatSlideToggle

  @Input() coin: CoinModel
  @Input() loader: boolean

  public checked: boolean
  public selected: boolean

  private selectedCoins: CoinModel[] = []

  constructor(
    private coinsService: CoinsService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    if (this.coin !== undefined) {
      this.subscribeToStore()
      this.subscribeToToggleData()
      this.subscribeToToggleState()
      this.handleCoinChecked()
    }
  }

  ngAfterViewInit(): void {

  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.selectedCoins = store.getState().coins.selectedCoins
    })
    this.selectedCoins = store.getState().coins.selectedCoins
  }

  private subscribeToToggleData() {

    this.coinsService.toggleData.subscribe(
      (data) => {

        if (data.coin && this.coin.symbol === data.coin.symbol) {
          this.checked = false
          this.selected = false
        }
        
        if (data.lastSelect && this.coin.symbol === data.lastSelect.symbol) {
          this.checked = true
          this.selected = true
        }
      }
    )
  }

  private subscribeToToggleState() {

    this.coinsService.toggleState.subscribe(
      (coins: CoinModel[]) => {
        if (coins.length > 0) {
          this.handleCoinSUnChecked(coins)
        }
      }
    )
  }




  // LOGIC SECTION

  public handleToggle(event) {

    if ((this.selectedCoins.length >= 5 && !this.selected)) {
      this.handleCoinsDialog()
      event.source.checked = false
    }

    else {
      event.checked
        ? this.handleSelectCoin()
        : this.handleUnSelectCoin()
    }
  }

  // checked selected coins after refresh

  private handleCoinChecked() {

    this.checked = !!this.selectedCoins.find((coin: CoinModel) => {
      return coin.id === this.coin.id
    })

    this.selected = this.checked

  }

  private handleCoinSUnChecked(selectedCoins: CoinModel[]) {

    selectedCoins.find((coin: CoinModel) => {
      if (coin.id === this.coin.id) {
        this.toggle.checked = false
        this.selected = false
      }
    })
  }

  private handleSelectCoin() {
    this.coinsService.addSelectedCoin(this.coin)
    this.selected = true

  }
  private handleUnSelectCoin() {
    this.coinsService.deleteSelectedCoin(this.coin.id)
    this.selected = false

  }



  // DIALOG COINS SECTION

  private handleCoinsDialog() {

    const payload = { coins: [...this.selectedCoins], lastSelect: this.coin }
    this.dialogService.handleCoinsDialog(payload)
  }




}
