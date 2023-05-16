import { createAction, props } from '@ngrx/store';
import { Coin } from 'src/app/models/coin.model';

export const loadCoins = createAction(
  '[Coin/API] Load Coin');

export const loadCoinsSuccess = createAction(
  '[Coin/API] Load Coin Success',
  props<{ coins: Coin[] }>()
);
export const loadCoinsFailure = createAction(
  '[Coin/API] Load Coin Failure',
  props<{ err: any }>()
);

