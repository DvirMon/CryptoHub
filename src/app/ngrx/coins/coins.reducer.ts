import { createReducer, on } from '@ngrx/store';
import { coinsAdapter, initialCoinsState } from './coins.state';
import { CoinsActions } from './coins.types';
import { deleteFile } from './coins.helpers';

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
  })),

  on(CoinsActions.addSelectedCoin, (state, { coin }) => ({
    ...state,
    selectedMap: {
      ...state.selectedMap,
      [coin.id]: coin
    }
  })),

  on(CoinsActions.deleteSelectedCoin, (state, { id }) => ({
    ...state,
    selectedMap: {
      ...deleteFile(id, state.selectedMap)
    }
  }))

);