import { createReducer, on } from '@ngrx/store';
import { coinsAdapter, initialCoinsState } from './coins.state';
import { CoinsActions } from './coins.types';
import { deleteFiled } from './coins.helpers';

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

  on(CoinsActions.addSelectedCoin, (state, { coinId, checked }) => ({
    ...state,
    selectedMap: {
      ...state.selectedMap,
      [coinId]: checked
    }
  })),

  on(CoinsActions.deleteSelectedCoin, (state, { id }) => ({
    ...state,
    selectedMap: {
      ...deleteFiled(id, state.selectedMap)
    }
  })),

  on(CoinsActions.updateSelectedCoins, (state, { coinsMap }) => ({
    ...state,
    selectedMap: {
      ...coinsMap
    },
    toggledMap: {
      ...coinsMap
    }
  })),

);
