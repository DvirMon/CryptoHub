export class CurrencyModel {

  constructor(
    public usd? : number,
    public eur? : number,
    public ils? : number,
    public url? : string,
  ) {}

  public static create () : CurrencyModel {
    return new CurrencyModel();
  }
}
