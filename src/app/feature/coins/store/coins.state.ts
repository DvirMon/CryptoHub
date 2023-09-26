import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Coin, CoinSearchResult, Currency } from "./coin.model";

export const coinsFeatureKey = 'coins';

export interface CoinsState extends EntityState<Coin> {
  selectedId?: string | number; // which Coins record has been selected
  loaded: boolean; // has the Coins list been loaded
  error?: string | null; // last known error (if any)
  currencyMap: Record<string, Currency>;
  selectedMap: Record<string, boolean>;
  searchResults: CoinSearchResult[]
}

export const coinsAdapter: EntityAdapter<Coin> = createEntityAdapter<Coin>();

const defaultCoinsState: CoinsState = {
  ids: [],
  entities: {},
  loaded: false,
  currencyMap: {},
  selectedMap: {},
  searchResults: []
}

export const initialCoinsState: CoinsState = coinsAdapter.getInitialState(defaultCoinsState)

