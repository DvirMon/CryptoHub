// ANGULAR CORE
import { Component, Input, OnInit, ViewChild } from '@angular/core';

// ANGULAR MATERIAL
import { MatSlideToggle } from '@angular/material/slide-toggle';

// SERVICES
import { CoinsService } from 'src/app/services/coins.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ToggleService } from 'src/app/services/toggle.service';

// MODELS
import { CoinModel } from 'src/app/utilities/models/coin.model';

// REDUX
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-item',
  templateUrl: './coins-item.component.html',
  styleUrls: ['./coins-item.component.scss']
})
export class CoinsItemComponent implements OnInit {

  @ViewChild(MatSlideToggle) toggle: MatSlideToggle

  @Input() coin: CoinModel
  @Input() loader: boolean

  // TOGGLE PRAMS
  public selectedCoins: CoinModel[] = []
  public checked: boolean
  public selected: boolean

  public smaller: boolean = false

  constructor(
    private coinsService: CoinsService,
    private dialogService: DialogService,
    private toggleService: ToggleService

  ) { }

  ngOnInit(): void {

    if (this.coin !== undefined) {
      this.subscribeToStore()
      this.subscribeToToggleData()
      this.subscribeToToggleState()
      this.handleCoinChecked()

      if (this.coin.symbol.length > 30) {
        this.smaller = true
      }
    }
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.selectedCoins = store.getState().coins.selectedCoins
    })
    this.selectedCoins = store.getState().coins.selectedCoins
  }

  private subscribeToToggleData() {

    this.toggleService.toggleData.subscribe(
      (data) => {

        if (data.coin && this.coin.symbol === data.coin.symbol) {
          this.toggle.checked = false
          this.selected = false
        }

        if (data.lastSelect && this.coin.symbol === data.lastSelect.symbol) {
          this.toggle.checked = true
          this.selected = true
        }
      }
    )
  }

  private subscribeToToggleState() {

    this.toggleService.toggleState.subscribe(
      (coins: CoinModel[]) => {
        if (coins.length > 0) {
          this.handleCoinsUnChecked(coins)
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

  private handleCoinsUnChecked(selectedCoins: CoinModel[]) {

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
