import { Component, Signal, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SearchInputComponent } from '../search-input/search-input.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoinStore } from 'src/app/feature/coins/store/coins.store.';
import { CoinSearchResult } from 'src/app/feature/coins/store/coin.model';
import { CoinSearchItemComponent } from 'src/app/feature/coins/coin-search-item/coin-search-item.component';

@Component({
  selector: 'app-search-sidenav',
  standalone: true,
  imports: [NgForOf, MatToolbarModule, SearchInputComponent, CoinSearchItemComponent],
  templateUrl: './search-sidenav.component.html',
  styleUrls: ['./search-sidenav.component.scss']
})
export class SearchSidenavComponent {

  private coinStore: CoinStore = inject(CoinStore);

  public readonly results: Signal<CoinSearchResult[]>;

  constructor() {
    this.results = this.coinStore.getCoinSearchResults();
  }

  onTermChanged(value: string): void {

    if (value) {
      this.coinStore.loadCoinSearchResults(value);
    }


  }
}
