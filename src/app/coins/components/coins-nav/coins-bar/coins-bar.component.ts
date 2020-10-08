import { Component, OnInit } from '@angular/core';

import { SideNavService } from 'src/app/services/side-nav.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

import { faCoins } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'app-coins-bar',
  templateUrl: './coins-bar.component.html',
  styleUrls: ['./coins-bar.component.scss']
})
export class CoinsBarComponent implements OnInit {

  public selectedCoins: CoinModel[] = []
  public mode: boolean = true
  public faIcon = faCoins;

  constructor(
    private sidenavService: SideNavService


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


  // SIDENAV SECTION
  public toggleSideNav(mode: boolean) {
    this.sidenavService.toggle()
    this.mode = mode
  }



}
