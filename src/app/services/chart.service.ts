import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartModel } from '../utilities/models/chart-data';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public url: string = environment.server + '/api/coins'

  constructor(
    private http: HttpClient,

  ) { }
  

  // POST - get currencies for chart - http://localhost:3000/api/coins/currencies

  public getChartData(ids: string[]): Observable<ChartModel[]> {
    return this.http.post<ChartModel[]>(this.url + "/currencies", { ids }, { reportProgress: true })

  }
}
