import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CoinsService } from 'src/app/services/coins.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { CurrencyModel } from 'src/app/utilities/models/currency.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-search-item',
  templateUrl: './coins-search-item.component.html',
  styleUrls: ['./coins-search-item.component.scss']
})
export class CoinsSearchItemComponent implements OnInit {


  @Input() coin: CoinModel

  @ViewChild(MatSlideToggle) toggle: MatSlideToggle

  private data: boolean = false

  // TOGGLE PRAMS
  private selectedCoins: CoinModel[] = []
  private selected: boolean

  public checked: boolean

  constructor(
    private coinsService: CoinsService,
    private dialogService: DialogService,
    private toggleService: ToggleService,
    public currency: CurrencyModel
  ) { }


  ngOnInit(): void {

    if (this.coin !== undefined) {
      this.subscribeToStore()
      // this.subscribeToToggleData()
      // this.subscribeToToggleState()
      this.handleCoinChecked()

    }
  }


  // SUBSCRIPTION SECTION

  private subscribeToStore() {

    store.subscribe(() => {
      this.selectedCoins = store.getState().coins.selectedCoins
    })
    this.selectedCoins = store.getState().coins.selectedCoins
  }




  // LOGIC SECTION
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

  // TOGGLE SECTION

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
    this.toggleService.toggleData.next({ coin: null, lastSelect: this.coin })
    this.selected = true
  }

  private handleUnSelectCoin() {
    this.coinsService.deleteSelectedCoin(this.coin.id)
    this.toggleService.toggleData.next({ coin: this.coin, lastSelect: null })
    this.selected = false

  }



  // DIALOG COINS SECTION

  private handleCoinsDialog() {

    const payload = { coins: [...this.selectedCoins], lastSelect: this.coin }
    this.dialogService.handleCoinsDialog(payload)
  }





}
