import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Coin } from "src/app/models/coin.model";
import { Currency } from "src/app/models/currency.model";

export const coinsFeatureKey = 'coins';

export interface CoinsState extends EntityState<Coin> {
  selectedId?: string | number; // which Coins record has been selected
  loaded: boolean; // has the Coins list been loaded
  error?: string | null; // last known error (if any)
  currencyMap: {[key : string] : Currency}
}

export const coinsAdapter: EntityAdapter<Coin> =
  createEntityAdapter<Coin>();

const defaultCoinsState: CoinsState = {
  ids: [], entities: {}, loaded: false, currencyMap: {}
}

export const initialCoinsState: CoinsState = coinsAdapter.getInitialState(defaultCoinsState)

