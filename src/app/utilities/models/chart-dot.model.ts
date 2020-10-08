import { Injectable } from '@angular/core'

export class ChartDotModel {

  constructor(
    public label?: string,
    public data?: number[],
  ) { }
}

export class DoughnutDot {
  constructor(
    public label?: string,
    public data?: number
  ) { }
}


