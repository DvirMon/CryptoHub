import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { Observable } from 'rxjs';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-bar',
  templateUrl: './coins-bar.component.html',
  styleUrls: ['./coins-bar.component.scss']
})
export class CoinsBarComponent implements OnInit {


  public selectedCoins: CoinModel[] = []

  public mode: boolean = true

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
