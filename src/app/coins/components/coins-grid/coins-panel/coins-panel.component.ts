import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, of } from 'rxjs';
import { CoinsService } from 'src/app/services/coins.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-panel',
  templateUrl: './coins-panel.component.html',
  styleUrls: ['./coins-panel.component.scss']
})
export class CoinsPanelComponent implements OnInit {

  @ViewChild(MatDrawer) public sidenav: MatDrawer;

  public coins: CoinModel[] = []

  constructor(
    private coinService: CoinsService,
    private sidenavService: SideNavService

  ) { }

  ngOnInit(): void {

    this.subscribeToStore()
    this.getCoinsData()
  }

  
  ngAfterViewInit(): void {
    console.log(this.sidenav)
    this.sidenavService.setSidenav(this.sidenav);
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
