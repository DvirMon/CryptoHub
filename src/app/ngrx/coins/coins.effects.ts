import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CoinsService } from 'src/app/feature/coins/coins.service';
import { CoinAPIActions, CoinDialogActions } from './coins.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EMPTY, map, catchError, tap, concatMap } from 'rxjs';
import { Coin, Currency } from './coin.model';


@Injectable()

export class CoinsEffects {

  constructor
    (
      private coinsService: CoinsService,
      private dialog: MatDialog,
      private actions$: Actions
    ) { }

  // load coin from Http request
  loadCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinAPIActions.loadCoins),
      concatMap(() => this.coinsService.getCoins()
        .pipe(
          map((coins: Coin[]) => CoinAPIActions.loadCoinSuccess({ coins })),
          catchError(() => EMPTY)
        ))
    )
  )

  updateCoinCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinAPIActions.updateCoinCurrency),
      concatMap((payload) => this.coinsService.getCoinCurrency(payload.id).pipe(
        map((currency: Currency) => CoinAPIActions.updateCoinCurrencySuccess({ id: payload.id, currency }),
          catchError(() => EMPTY)
        )
      )
      )
    )
  )

  dialogOpened$ = createEffect(() => this.actions$.pipe(
    ofType(CoinDialogActions.dialogOpened),
    tap(payload => {
      this.dialog.open(payload.component(), { data: payload.data } as MatDialogConfig)
    })
  ), { dispatch: false })

  dialogSaved$ = createEffect(() => this.actions$.pipe(
    ofType(CoinDialogActions.dialogSaved),
    map(payload => CoinAPIActions.updateSelectedCoinsMap({ coinsMap: payload.data as { [key: string]: boolean } })))
  )
}
