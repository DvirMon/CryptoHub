import { Component, Input, OnDestroy, OnInit } from '@angular/core';

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


  @Input() coins: CoinModel[]
  @Input() searchMode: boolean


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
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.subscribeToLoader()

    if (!this.searchMode) {
      this.setSkeletonGrid()
    }
  } 
 
  ngOnDestroy(): void {

    this.unsubscribeLouder.unsubscribe()

  }

  // SUBSCRIPTION SECTION

  private subscribeToLoader() {

    this.unsubscribeLouder = this.loaderService.gridLoader.subscribe(
      (loader) => {
        this.loader = loader.loader
        this.progress = loader.progress

      }
    )
  }

  // HTTP SECTION

  public getNextCoinsData() {
    this.page = this.page + 1
    this.coinService.getCoins(this.page)
  }

  // LOGIC SECTION

  private setSkeletonGrid() {

    this.isMobile.subscribe(
      (isMobile) => {
        if (store.getState().coins.coins.length === 0) {
          isMobile
            ? this.coins.length = 5
            : this.coins.length = 41
        }
      }
    )
  }

  public onScroll(event: IPageInfo) {
    if (event.endIndex !== this.coins.length - 1 || this.searchMode || this.coins.length < 42) {
      return
    }

    this.offset = true

    this.getNextCoinsData()

  }

  public scrollToTop(scroll: VirtualScrollerComponent) {

    scroll.scrollToIndex(1, true, 0, 3000)
    this.offset = false



  }


}
