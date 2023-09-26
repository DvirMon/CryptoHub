import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Coin, Currency, CoinSearchResult } from './store/coin.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  private url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,
    // private formService: FormService,
  ) { }

  // HTTP SECTION


  // Get coins by pagination

  public getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.url);
  }

  public getCoinCurrency(id: string): Observable<Currency> {
    return this.http.get<Currency>(this.url + "/currency/" + id, { reportProgress: true });
  }

  public getCoinSearchResults(value: string): Observable<CoinSearchResult[]> {
    const params = new HttpParams().set('searchTerm', value);
    return this.http.get<CoinSearchResult[]>(this.url + "/search", { params });
}



}
