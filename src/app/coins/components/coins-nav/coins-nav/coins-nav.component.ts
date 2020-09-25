import { Component, Input, OnInit, ViewChild } from '@angular/core';

// IMPORT ANGULAR MATERIEL
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

// IMPORT SERVICES
import { FormService } from 'src/app/services/form.service';

// IMPORT MODELS
import { CoinModel } from 'src/app/utilities/models/coin.model';

// IMPORT RXJS
import { Observable } from 'rxjs';

// IMPORT REDUX
import { store } from 'src/app/utilities/redux/store';
import { CoinsService } from 'src/app/services/coins.service';


@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss'],

})
export class CoinsNavComponent implements OnInit {

  @ViewChild(MatDrawer) selectDrawer: MatDrawer

  @Input() drawer: MatSidenav

  public selectedCoins: CoinModel[] = []
  public isMobile: Observable<boolean> = this.formService.isMobile()
  public toggleSelect: boolean = false

  public routers = [
    { label: "Home", route: "/coins/list", icon: "home" },
    { label: "Real-Time Charts", route: "/coins/charts", icon: "insert_chart" },
  ]

  private coinsToDelete: string[] = []
  private deleteAll: boolean

  constructor(
    private formService: FormService,
    private coinsService: CoinsService

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


  // EVENTS SECTION

  public onClick() {
    this.formService.toggleSearch.next(false)
  }

  public handleToggle() {
    this.selectDrawer.toggle()
    if (!this.selectDrawer.opened) {
      this.handleCoinDelete()
      this.handleDeleteAll()
    }

  }
  
  // EMIT EVENTS SECTION
  public handleEmitDelete(coinId: string) {
    this.coinsToDelete.push(coinId)
  }

  public handleEmitDeleteAll(state: boolean) {
    this.deleteAll = true
  }
  
  // LOGIC SECTION
  private handleCoinDelete() {
    this.coinsToDelete.map((coinId: string) => {
      this.coinsService.deleteSelectedCoin(coinId)
    })
  }

  private handleDeleteAll() {
    if (this.deleteAll) {
      this.coinsService.deleteAllSelectedCoin()
      this.deleteAll = false
    }
  }








}
