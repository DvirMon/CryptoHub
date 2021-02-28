export class CoinModel {

  constructor(
    public id?: string,
    public name?: string,
    public symbol?: string,
    public url?: string
  ) { }

  public static create () : CoinModel {
    return new CoinModel();
  }
}


