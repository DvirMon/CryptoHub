import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { FormService } from 'src/app/services/form.service';

import { Observable } from 'rxjs';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  @Input() drawer: MatSidenav

  public selectedCoins: CoinModel[] = []
  public isMobile: Observable<boolean> = this.formService.isMobile()
  public toggleSelect: boolean = false

  public routers = [
    { label: "Home", route: "/coins/list", icon: "home" },
    { label: "Real-Time Charts", route: "/coins/charts", icon: "insert_chart" },
  ]

  constructor(
    private formService: FormService

  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }


  // public toggleSearch() {
  //   this.formService.toggleSearch.next(false)

  // }

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
      }
    )
    this.selectedCoins = store.getState().coins.selectedCoins
  }

  public toggleSelectedCoins() {
    this.toggleSelect = !this.toggleSelect

  }


}
