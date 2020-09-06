import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CoinModel } from '../utilities/models/coin-model';
import { CoinsService } from './coins.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchEntries: BehaviorSubject<Observable<string[]>> = new BehaviorSubject(of([]))
  public results: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public searchResults: string[] = []

  constructor(
    private coinsService: CoinsService
  ) { }


  public handleSearch(searchControl): Observable<string[]> {
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

  public search(option: string): Observable<string[]> {
    return this.coinsService.searchCoins()
      .pipe(
        map((coins: string[]) => {
          return this.filter(coins, option)
        })
        , tap(coins => {

          if (coins.length === 0) {
            return this.handleError()
          }
          return this.handleSuccess(coins)
        })

      )
  }

  // public searchNav(option: string): Observable<CoinModel[]> {
  //   return this.coinsService.searchCoinsNav()
  //     .pipe(
  //       map((coins: CoinModel[]) => {
  //         return this.filter(coins, option)
  //       })
  //       , tap(coins => {

  //         if (coins.length === 0) {
  //           return this.handleError()
  //         }
  //         return this.handleSuccess(coins)
  //       })

  //     )
  // }



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
    this.searchEntries.next(of([]));
    return of([]);
  }

  // handle search success
  private handleSuccess(response: string[]): Observable<string[]> {
    this.results.next(false)
    this.searchEntries.next(of(response))
    return of(response)
  }

  // handle search filter
  private filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
