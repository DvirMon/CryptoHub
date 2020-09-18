import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CoinModel } from '../utilities/models/coin-model';
import { CoinsService, SearchData } from './coins.service';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchEntries: BehaviorSubject<CoinModel[]> = new BehaviorSubject([])
  public results: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  public searchSkeleton: CoinModel[] = []

  constructor(
    private coinsService: CoinsService,
    private sortService: SortService
  ) { }


  public handleSearch(searchControl): Observable<CoinModel[]> {

    return searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim() || this.validFormat(searchTerm)) {
          return this.handleError()
        }
        this.handleSearchSkeleton()
        return this.search(searchTerm.trim().toLocaleLowerCase())
      }))
  }

  private search(option: string): Observable<CoinModel[]> {
    return this.coinsService.searchCoins()
      .pipe(
        map((coins: CoinModel[]) => {
          return this.sortService.filter(coins, option)
        }),
        map((coins: CoinModel[]) => {
          return coins.splice(0, 48)
        }),
        tap((coins: CoinModel[]) => {
          return coins.sort((a, b) => {
            return this.sortService.sortLength(a.symbol, b.symbol)
          })
        })
        , tap(coins => {

          if (coins.length === 0) {
            return this.handleError()
          }
          return this.handleSuccess(coins)
        })

      )
  }


  // prevent search with special symbols
  private validFormat(searchTerm: string): boolean {
    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(searchTerm)
  }

  // handle search error
  public handleError(): Observable<[]> {
    this.results.next(true)
    this.searchEntries.next([]);
    return of([]);
  }

  // handle search success
  private handleSuccess(response: CoinModel[]): Observable<CoinModel[]> {
    this.results.next(false)
    this.searchEntries.next(response)
    return of(response)
  }

  private handleSearchSkeleton() {
    this.searchSkeleton.length = 48
    this.searchEntries.next(this.searchSkeleton)
  }


}
