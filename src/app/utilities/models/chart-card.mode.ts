import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChartCardModel {

  constructor(
  ) { }

  public title?: string
  public cols?: number
  public rows?: number
  public type?: string
  
}