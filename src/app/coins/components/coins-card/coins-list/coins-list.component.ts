import { Component, OnInit } from '@angular/core';

import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service'

import { CoinModel } from 'src/app/utilities/models/coin-model';

import { Observable } from 'rxjs';
import { store } from 'src/app/utilities/redux/store';
import { SearchService } from 'src/app/services/search.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  public coins: CoinModel[] = [];
  public searchEntries: Observable<CoinModel[]>;

  // LOADING PARAMS
  public skeltonGrid = []
  public loader: boolean = true
  public searchMode: boolean = false

  public isMobile: Observable<boolean> = this.formService.isMobile()


  constructor(
    private coinService: CoinsService,
    private searchService: SearchService,
    private formService: FormService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.setSkeletonGrid()
    this.subscribeToStore()
    this.subscribeToLoader()
    this.subscribeToSearchEntries()
    this.getCoinsData()
  }

  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(() => {
      this.coins = store.getState().coins.coins
    })
  }

  private subscribeToSearchEntries() {
    this.searchService.searchEntries.subscribe(
      (searchEntries) => {
        this.searchEntries = searchEntries
        this.coins = []

      }
    )
  }

  private subscribeToLoader() {

    this.loaderService.loader.subscribe(
      (loader) => {
        this.loader = loader
      }
    )
  }

  // HTTP SECTION

  private getCoinsData() {
    if (this.coins.length === 0) {
      this.coinService.getCoins(1).subscribe(
        (coins) => {
          this.coins = coins
          this.loaderService.loader.next(false)
        },
        () => {
          this.loaderService.loader.next(false)
        }
      )
    }

  }

  private setSkeletonGrid() {
    this.isMobile.subscribe(
      (isMobile) => {
        isMobile
          ? this.skeltonGrid.length = 4
          : this.skeltonGrid.length = 12
      }
    )
  }


}
