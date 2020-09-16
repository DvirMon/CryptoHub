import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CoinModel } from '../utilities/models/coin-model';
import { CoinsService, SearchData } from './coins.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchEntries: BehaviorSubject<CoinModel[]> = new BehaviorSubject([])
  public results: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public searchSkeleton: Subject<number> = new Subject();
  public searchResults: string[] = []

  constructor(
    private coinsService: CoinsService
  ) { }


  public handleSearch(searchControl): Observable<CoinModel[]> {

    return searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim() || this.validFormat(searchTerm)) {
          return this.handleError()
        }
        return this.search(searchTerm.trim().toLocaleLowerCase())
      }))
  }

  public search(option: string): Observable<CoinModel[]> {
    return this.coinsService.searchCoins()
      .pipe(
        map((data: SearchData) => {
          return this.filter(data.coins, option)
        }),
        map((coins: CoinModel[]) => {
          return coins.splice(0, 50)
        }),
        tap((coins: CoinModel[]) => {
          return coins.sort((a, b) => {
            return this.sortLength(a.symbol, b.symbol)
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


  public onSelect(option: string) {
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

  // handle search filter
  private filter(options: CoinModel[], value: string): CoinModel[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.symbol.toLowerCase().includes(filterValue));
  }

  // sort by length
  private sortLength(a: string, b: string) {
    return a.length - b.length;

  }
}
