import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Coin } from "src/app/models/coin.model";

export const coinsFeatureKey = 'coins';

export interface CoinsState extends EntityState<Coin> {
  selectedId?: string | number; // which Products record has been selected
  loaded: boolean; // has the Products list been loaded
  error?: string | null; // last known error (if any)
}

export const coinsAdapter: EntityAdapter<Coin> =
  createEntityAdapter<Coin>();

const defaultCoinsState: CoinsState = {
  ids: [], entities: {}, loaded: false
}

export const initialCoinsState: CoinsState = coinsAdapter.getInitialState(defaultCoinsState)

