import { ChartDotModel } from '../../models/chart-dot.model';

export class ChartAppState {

  public chartDots: ChartDotModel[] = []
  public ChartData: {
    usd?: ChartDotModel[],
    eur?: ChartDotModel[],
    ils?: ChartDotModel[],
  }

  constructor() {
  }
}