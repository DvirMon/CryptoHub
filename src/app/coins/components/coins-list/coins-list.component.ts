import { Component, OnInit } from '@angular/core';

import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';

import { CoinModel } from 'src/app/utilities/models/coin-model';

import { Observable } from 'rxjs';
import { store } from 'src/app/utilities/redux/store';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  public coins: CoinModel[] = []; 
  public searchEntries: Observable<CoinModel[]>;
  public isMobile : Observable<boolean> = this.formService.isMobile()

  constructor(
    private coinService  :CoinsService,
    private searchService: SearchService,
    private formService : FormService
  ) { }
  
  ngOnInit(): void {
    this.coinService.getCoins(1)
    this.subscribeToStore()
    this.subscribeToSearchEntries()
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
      }
    )
  }


}
