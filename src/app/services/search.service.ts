import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { CoinModel } from '../utilities/models/coin.model';
import { SortService } from './sort.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = environment.server + '/api/coins/search'
  private searchSkeleton: CoinModel[] = []
  private entires: number = 48;
  private skeletonEntries: number = 48;
 
  public searchEntries: BehaviorSubject<CoinModel[]> = new BehaviorSubject([])
  public results: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private sortService: SortService
  ) { }

  // HTTP SECTION

  // GET request - get coins by search - http://localhost:3000/api/coins

  private getCoins(option: string): Observable<CoinModel[]> {

    return this.http.get<CoinModel[]>(this.url, { reportProgress: true })
      .pipe(
        map((coins: CoinModel[]) => {
          return this.handleSearchEntries(coins, option)
        }),
        // handle success and error
        tap(coins => { 

          this.skeletonEntries = coins.length

          if (coins.length === 0) {
            return this.handleError()
          }
          return this.handleSuccess(coins)
        })

      )
  }

  // LOGIC SECTION

  // search main method

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

  // handle search grid
  private handleSearchSkeleton() {
    this.searchSkeleton.length = this.skeletonEntries
    this.searchEntries.next(this.searchSkeleton)
  }

  // format search entries
  private handleSearchEntries(coins: CoinModel[], option: string): CoinModel[] {
    return this.sortService
      .filter(coins, option)
      .slice(0, this.entires)
      .sort((a, b) => {
        return this.sortService.sortLength(a.symbol, b.symbol)
      })
  }


}
