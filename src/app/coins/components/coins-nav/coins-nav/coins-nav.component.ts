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


@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss'],

})
export class CoinsNavComponent implements OnInit {

  @ViewChild(MatDrawer) drawer: MatDrawer

  public selectedCoins: CoinModel[] = []
  public isMobile: Observable<boolean> = this.formService.isMobile()

  public routers = [
    { label: "Home", route: "/coins", icon: "home" },
    { label: "Real-Time Charts", route: "/coins/charts", icon: "insert_chart" },
  ]

  constructor(
    private formService: FormService,


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









}
