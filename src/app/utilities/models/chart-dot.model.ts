
export class ChartDotModel {

  constructor(
    public label?: string,
    public data?: number[],
  ) { }

  public static create() : ChartDotModel {
    return new ChartDotModel();
  }
}
