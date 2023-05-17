import { createAction, props } from '@ngrx/store';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';

export const loadCoins = createAction(
  '[Coin/API] Load Coins');

export const loadCoinsSuccess = createAction(
  '[Coin/API] Load Coin Success',
  props<{ coins: Coin[] }>()
);
export const loadCoinsFailure = createAction(
  '[Coin/API] Load Coin Failure',
  props<{ err: any }>()
);

export const selectedCoinId = createAction(
  '[Coin/API] Update Selected Coin Id',
  props<{ id: string }>()
);

export const updateCoinCurrency = createAction(
  '[Coin/API] Update Coin Currency',
  props<{ id: string }>()
);

export const updateCoinCurrencySuccess = createAction(
  '[Coin/API] Update Coin Currency Success',
  props<{ currency: Currency }>()
);

export const updateCoinCurrencyFailure = createAction(
  '[Coin/API] Update Coin Currency Failure',
  props<{ err: any }>()
);

