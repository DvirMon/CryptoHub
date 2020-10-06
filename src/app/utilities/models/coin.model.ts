import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class CoinModel {

  constructor(
  ) { }

  public id?: string
  public name?: string
  public symbol?: string
  public url?: string
}