import { ChartData } from "src/app/services/chart.service";

export class ChartCardModel {

  constructor(


    public type?: string,
    public title?: string,
    public cols?: number,
    public rows?: number,
    public currentCurrency?: string,
    public currentCoin?: string,
    public data? : ChartData,
    ) { }

    public static create (payload : ChartCardModel) : ChartCardModel {
      return new ChartCardModel(
        payload.type,
        payload.title,
        payload.cols,
        payload.rows,
        payload.currentCurrency,
        payload.currentCoin,
      );
    }

}
