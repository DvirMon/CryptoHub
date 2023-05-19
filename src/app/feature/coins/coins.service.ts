import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';

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
    return this.http.get<Coin[]>(this.url)
  }

  // POST request - get coins pagination - http://localhost:3000/api/coins

  private getCoinsPage(params: any): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.url)
  }

  // GET - get currencies of coin by id - http://localhost:3000/api/coins/currency:id

  public getCoinCurrency(id: string): Observable<Currency> {
    console.log('http called', id)
    return this.http.get<Currency>(this.url + "/currency/" + id, { reportProgress: true })

  }



}
