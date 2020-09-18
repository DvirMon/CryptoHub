import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartModel } from '../utilities/models/chart-data';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { store } from '../utilities/redux/store';

export interface ChartData {
  usd : ChartModel[],
  eur : ChartModel[],
  ils : ChartModel[],
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,

  ) { }


  // POST - get currencies for chart - http://localhost:3000/api/coins/chart
 
  public getChartData(): Observable<ChartData> {
    const ids = store.getState().coins.selectedCoins
    return this.http.post<ChartData>(this.url + "/chart", { ids }, { reportProgress: true })

  }
}
