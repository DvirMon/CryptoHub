import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public sort: MatSort;


  // sort
  public getSortedData(data: string[]) {

    return data.sort((a, b) => {
      return this.compare(a, b, true);
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
