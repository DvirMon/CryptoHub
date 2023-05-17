import { Currency } from "./currency.model";

export interface Coin {

  id: string,
  name: string,
  symbol: string,
  image: string,
  currency: Currency
}


