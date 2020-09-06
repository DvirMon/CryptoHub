import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CoinModel } from '../utilities/models/coin-model';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public sort: MatSort;


  // sort
  public getSortedData(data: CoinModel[]) {

    return data.sort((a, b) => {
      return this.compare(a.symbol, b.symbol, true);
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

 
}
