import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCoins from './coins.state'
import { Coin } from './coin.model';




const selectCoinsState = createFeatureSelector<fromCoins.CoinsState>(fromCoins.coinsFeatureKey);

const { selectAll } = fromCoins.coinsAdapter.getSelectors();

const selectCoinsLoaded = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): boolean => state.loaded
);
const selectCoinsId = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): string => state.selectedId as string
);

const selectAllCoins = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState): Coin[] => selectAll(state)
);

const selectCurrencyMap = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState) => state.currencyMap
);

const selectCoinsMap = createSelector(
  selectCoinsState,
  (state: fromCoins.CoinsState) => state.selectedMap
);

const selectCoinsAmount = createSelector(
  selectCoinsMap,
  (state) => Object.keys(state).length
);

export const CoinSelector = {
  selectCoinsState,
  selectCoinsLoaded,
  selectCoinsId,
  selectAllCoins,
  selectCurrencyMap,
  selectCoinsMap,
  selectCoinsAmount,
}






