export class ChartCardModel {

  constructor(


    public title?: string,
    public cols?: number,
    public rows?: number,
    public type?: string
    ) { }

    public static create () : ChartCardModel {
      return new ChartCardModel();
    }

}
