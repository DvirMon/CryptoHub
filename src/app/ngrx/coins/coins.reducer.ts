import { createReducer, on } from '@ngrx/store';
import { coinsAdapter, initialCoinsState } from './coins.state';
import { CoinsActions } from './coins.types';
import { Coin } from 'src/app/models/coin.model';

export const coinsReducer = createReducer(
  initialCoinsState,

  on(CoinsActions.loadCoins, (state) => ({
    ...state,
  })),

  on(CoinsActions.loadCoinsSuccess, (state, { coins }) =>
    coinsAdapter.setAll(coins, { ...state, loaded: true })),

  on(CoinsActions.updateCoinCurrencySuccess, (state, { id, currency }) => ({
    ...state,
    currencyMap: {
      ...state.currencyMap,
      [id]: currency
    }
  }))

);
