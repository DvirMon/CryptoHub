import { Component, Input, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-select-mobile',
  templateUrl: './coins-select-mobile.component.html',
  styleUrls: ['./coins-select-mobile.component.scss']
})
export class CoinsSelectMobileComponent implements OnInit {

  public selectedCoins: CoinModel[] = []

  public isExpanded: boolean = true;
  public showSubmenu: boolean = false;
  public isShowing: boolean = false;
  public showSubSubMenu: boolean = false;

  constructor(
    private coinsService: CoinsService,
    private toggleService: ToggleService
  ) { }



  ngOnInit(): void {

    this.subscribeToStore()
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = [...store.getState().coins.selectedCoins]
      }
    )
    this.selectedCoins = [...store.getState().coins.selectedCoins]
  }


  public handleToggle(coin: CoinModel) {

    // this.toggleService.toggleData.next({ coin, lastSelect: null })

  }


  // LOGIC SECTION

  public deleteCoins() {
    // this.toggleService.toggleAllSelectedCoins()
    // this.coinsService.deleteAllSelectedCoin()

  }




}
