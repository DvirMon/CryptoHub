import { Component, OnDestroy, OnInit } from '@angular/core';

import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service'

import { CoinModel } from 'src/app/utilities/models/coin.model';

import { Observable, Subscription } from 'rxjs';
import { IPageInfo, VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {


  public coins: CoinModel[] = []

  // LOADING PARAMS
  public loader: boolean;
  public progress: number = 100;

  public isMobile: Observable<boolean> = this.formService.isMobile()
  public offset: boolean

  private page: number = 1
  private unsubscribeLouder: Subscription

  constructor(
    private coinService: CoinsService,
    private formService: FormService,
    private loaderService: LoaderService,
  ) { }

  // LIFE CYCLE SECTION
  ngOnInit(): void {
    this.subscribeToStore()
    this.subscribeToLoader()
    this.setSkeletonGrid()
  }

  ngOnDestroy(): void {
    this.unsubscribeLouder.unsubscribe()
  }

  // SUBSCRIPTION SECTION

  // subscribe to store
  private subscribeToStore() {
    store.subscribe(() => {
      this.coins = store.getState().coins.coins
    })
    this.coins = store.getState().coins.coins
  }

  // subscribe to subject
  private subscribeToLoader() {
    this.unsubscribeLouder = this.loaderService.gridLoader.subscribe(
      (loader) => {
        this.loader = loader.loader
        this.progress = loader.progress

      }
    )
  }

  // HTTP SECTION

  private getNextCoinsData() {
    this.page = this.page + 1
    this.coinService.getCoins(this.page)
  }

  // LOGIC SECTION

  private setSkeletonGrid() {

    this.isMobile.subscribe(
      (isMobile) => {
        if (store.getState().coins.coins.length === 0) {
          isMobile
            ? this.coins.length = 4
            : this.coins.length = 16
        }
      }
    )
  }

  public onScroll(event: IPageInfo) {

    this.scrollToTopVisibility(event)

    if (event.endIndex !== this.coins.length - 1) {
      return
    }

    this.getNextCoinsData()
  }

  public scrollToTop(scroll: VirtualScrollerComponent) {
    scroll.scrollToIndex(1, true, 0, 3000)
    this.offset = false

  }

  private scrollToTopVisibility (event: IPageInfo) {
    event.endIndex > 20 ? this.offset = true : this.offset = false

  }


}
