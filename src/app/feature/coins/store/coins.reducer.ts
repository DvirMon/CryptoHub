import { createReducer, on } from '@ngrx/store';
import { coinsAdapter, initialCoinsState } from './coins.state';
import { CoinAPIActions } from './coins.actions';
import { deleteFiled } from './coins.helpers';

export const coinsReducer = createReducer(
  initialCoinsState,

  on(CoinAPIActions.loadCoins, (state) => ({
    ...state,
  })),

  on(CoinAPIActions.loadCoinSuccess, (state, { coins }) =>
    coinsAdapter.setAll(coins, { ...state, loaded: true })),

  on(CoinAPIActions.updateCoinCurrencySuccess, (state, { id, currency }) => ({
    ...state,
    currencyMap: {
      ...state.currencyMap,
      [id]: currency
    }
  })),

  on(CoinAPIActions.addSelectedCoin, (state, { coinId, checked }) => ({
    ...state,
    selectedMap: {
      ...state.selectedMap,
      [coinId]: checked
    }
  })),

  on(CoinAPIActions.deleteSelectedCoin, (state, { id }) => ({
    ...state,
    selectedMap: {
      ...deleteFiled(id, state.selectedMap)
    }
  })),

  on(CoinAPIActions.updateSelectedCoinsMap, (state, { coinsMap }) => ({
    ...state,
    selectedMap: {
      ...coinsMap
    },
  })),

  on(CoinAPIActions.loadSearchCoinSuccess, (state, { results }) => ({
    ...state,
    searchResults: [...results]
  }))

);
