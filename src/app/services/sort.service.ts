import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CoinModel } from '../utilities/models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  // sort
  public getSortedData(data: CoinModel[]): CoinModel[] {

    return data.sort((a, b) => {
      return this.compare(a.symbol, b.symbol, true);
    })
  }

  // filter by search value
  public filter(options: CoinModel[], value: string): CoinModel[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.symbol.toLowerCase().startsWith(filterValue));
  }

  // sort by length
  public sortLength(a: string, b: string) {
    return a.length - b.length;

  }

  // sort by abc
  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
