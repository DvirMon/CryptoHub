import { Component, OnInit } from '@angular/core';

import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service'

import { CoinModel } from 'src/app/utilities/models/coin-model';

import { Observable, of } from 'rxjs';
import { store } from 'src/app/utilities/redux/store';
import { SearchService } from 'src/app/services/search.service';
import { map } from 'rxjs/operators';
import { ActionType } from 'src/app/utilities/redux/action-type';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  public coins: CoinModel[] = [];
  public searchEntries: Observable<CoinModel[]>;

  // LOADING PARAMS
  public loader: boolean = true
  public searchMode: boolean = false
  public progress: number;
  public page: number = 1

  public isMobile: Observable<boolean> = this.formService.isMobile()


  constructor(
    private coinService: CoinsService,
    private searchService: SearchService,
    private formService: FormService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
    this.subscribeToLoader()
    this.subscribeToSearchEntries()
    this.setSkeletonGrid()
    this.getCoinsData()
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.coins = store.getState().coins.coins
    })
    this.coins = store.getState().coins.coins
  }

  private subscribeToSearchEntries() {
    this.searchService.searchEntries.subscribe(
      (searchEntries) => {

        this.searchEntries = of(searchEntries)

        searchEntries.length > 0
          ? this.searchMode = true
          : this.searchMode = false

      }
    )
  }

  private subscribeToLoader() {

    this.loaderService.loader.subscribe(
      (loader) => {
        this.loader = loader.loader
        this.progress = loader.progress
      }
    )
  }

  // HTTP SECTION

  private getCoinsData() {

    if (this.coins.length < 13) {

      this.coinService.getCoins(this.page)
    }

  }

  private getNextCoinsData() {
    this.coinService.getNextCoins(this.page++)
  }

  // LOGIC SECTION

  private setSkeletonGrid() {


    this.isMobile.subscribe(
      (isMobile) => {
        if (store.getState().coins.coins.length === 0) {
          isMobile
            ? this.coins.length = 5
            : this.coins.length = 12
        }
      }
    )
  }

  public onScroll() {
    console.log("scrolling")
  }


}
