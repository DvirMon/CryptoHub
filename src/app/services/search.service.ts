import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { CoinModel } from '../utilities/models/coin-model';
import { CoinsService } from './coins.service';
import { SortService } from './sort.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public url: string = environment.server + '/api/coins'


  public searchEntries: BehaviorSubject<CoinModel[]> = new BehaviorSubject([])
  public results: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public searchSkeleton: CoinModel[] = []

  constructor(
    private http: HttpClient,
    private coinsService: CoinsService,
    private sortService: SortService
  ) { }

  // HTTP SECTION

  // GET request - get coins by search - http://localhost:3000/api/coins


  private getCoins(option: string): Observable<CoinModel[]> {

    return this.http.get<CoinModel[]>(this.url, { reportProgress: true })
      .pipe(

        // sort by abc 
        map((coins: CoinModel[]) => {
          return this.sortService.getSortedData(coins)
        }),
        // filter matching coins to search option 
        map((coins: CoinModel[]) => {
          return this.sortService.filter(coins, option)
        }),
        // splice for the first 48 results 
        map((coins: CoinModel[]) => {
          return coins.splice(0, 48)
        }),
        // sort results by length 
        map((coins: CoinModel[]) => {
          return coins.sort((a, b) => {
            return this.sortService.sortLength(a.symbol, b.symbol)
          })
        }),
        // handle data
        tap(coins => {

          if (coins.length === 0) {
            return this.handleError()
          }
          return this.handleSuccess(coins)
        })

      )
  }

  // LOGIC SECTION

  public search(searchControl): Observable<CoinModel[]> {

    return searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim() || this.validFormat(searchTerm)) {
          return this.handleError()
        }
        this.handleSearchSkeleton()
        return this.getCoins(searchTerm.trim().toLocaleLowerCase())
      }))
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
