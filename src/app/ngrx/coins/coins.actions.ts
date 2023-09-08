import { ComponentType } from '@angular/cdk/portal';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Coin, Currency } from './coin.model';

export const CoinAPIActions = createActionGroup({
  source: 'Coin/API',
  events: {
    'Load Coins': emptyProps(),
    'Load Coin Success': props<{ coins: Coin[] }>(),
    'Load Coin Failure': props<{ err: any }>(),
    'Update Coin Currency': props<{ id: string }>(),
    'Update Coin Currency Success': props<{ id: string, currency: Currency }>(),
    'Update Coin Currency Failure': props<{ err: any }>(),
    'Add Selected Coin': props<{ coinId: string, checked: boolean }>(),
    'Delete Selected Coin': props<{ id: string }>(),
    'Update Selected Coins Map': props<{ coinsMap: { [key: string]: boolean } }>(),
  }
});

export const CoinDialogActions = createActionGroup({
  source: 'Coin Dialog',
  events: {
    'Dialog Opened': props<{ component: () => ComponentType<unknown>, data: unknown }>(),
    'Dialog Closed': props<{ data: unknown }>(),
    'Dialog Saved': props<{ data: unknown }>(),
  }
});


// export const loadCoins = createAction(
//   '[Coin/API] Load Coins');

// export const loadCoinsSuccess = createAction(
//   '[Coin/API] Load Coin Success',
//   props<{ coins: Coin[] }>()
// );

// export const loadCoinsFailure = createAction(
//   '[Coin/API] Load Coin Failure',
//   props<{ err: any }>()
// );

// export const updateCoinCurrency = createAction(
//   '[Coin/API] Update Coin Currency',
//   props<{ id: string }>()
// );

// export const updateCoinCurrencySuccess = createAction(
//   '[Coin/API] Update Coin Currency Success',
//   props<{ id: string, currency: Currency }>()
// );

// export const updateCoinCurrencyFailure = createAction(
//   '[Coin/API] Update Coin Currency Failure',
//   props<{ err: any }>()
// );

// export const addSelectedCoin = createAction(
//   '[Coin/API] Add Selected Coin',
//   props<{ coinId: string, checked: boolean }>()
// )

// export const deleteSelectedCoin = createAction(
//   '[Coin/API] Delete Selected Coin',
//   props<{ id: string }>()
// )

// export const updateSelectedCoins = createAction('Coin/API Update Selected Coins Map',
//   props<{ coinsMap: { [key: string]: boolean } }>())

// export const openCoinsDialog = createAction(
//   '[Coin Dialog] Dialog Opened',
//   props<{ component: () => ComponentType<unknown>, data: unknown }>()
// )

// export const closedCoinsDialog = createAction(
//   '[Coin Dialog] Dialog Closed',
//   props<{ data: unknown }>()
// )

// export const savedCoinsDialog = createAction(
//   '[Coin Dialog] Dialog Saved',
//   props<{ data: unknown }>()
// )

