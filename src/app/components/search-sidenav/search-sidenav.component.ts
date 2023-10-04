import { NgForOf } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoinStore } from 'src/app/feature/coins/store/coins.store.';
import { CoinSearchResult } from 'src/app/feature/coins/store/coin.model';
import { CoinSearchItemComponent } from 'src/app/feature/coins/coin-search-item/coin-search-item.component';
import { CheckedChangedEvent } from 'src/app/feature/coins/coins-item/coins-item.component';
import { CoinsDialogComponent } from 'src/app/feature/coins/coins-dialog/coins-dialog.component';
import { COINS_SELECT_LIMIT } from 'src/app/shared/constants';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';

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
  public readonly selectedMap: Signal<Record<string, boolean>> = this.coinStore.getSelectedCoinMap();

  public readonly selectedCoinsAmount: Signal<number> = this.coinStore.getSelectedCoinsAmount();
  public readonly toggleLimit = this.setToggleLimit(COINS_SELECT_LIMIT, this.selectedCoinsAmount);

  constructor() {
    this.results = this.coinStore.getCoinSearchResults();
  }

  onTermChanged(value: string): void {

    if (value) {
      this.coinStore.loadCoinSearchResults(value);
    }
  }

  onCheckedChanged(event: CheckedChangedEvent): void {

    const { checked, coinId } = event;
    this.coinStore.setSelectedMap(checked, coinId);
  }

  onToggleLimit(): void {
    this.coinStore.openDialog(() => CoinsDialogComponent)
  }


  private setToggleLimit(limit: number, length: Signal<number>): Signal<boolean> {
    return computed(() => limit > length())
  }



}
