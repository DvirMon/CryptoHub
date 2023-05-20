import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, exhaustMap, map, catchError, tap } from 'rxjs';

import { CoinsService } from 'src/app/feature/coins/coins.service';
import { CoinsActions } from './coins.types';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { CoinsDialogComponent } from 'src/app/feature/coins/coins-dialog/coins-dialog.component';


@Injectable()

export class CoinsEffects {

  constructor
    (
      private coinsService: CoinsService,
      private dialogService: DialogService,
      private dialog: MatDialog,
      private actions$: Actions
    ) { }

  // load coin from Http request
  loadCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinsActions.loadCoins),
      exhaustMap(() => this.coinsService.getCoins()
        .pipe(
          map((coins: Coin[]) => CoinsActions.loadCoinsSuccess({ coins })),
          catchError(() => EMPTY)
        ))
    )
  )

  updateCoinCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinsActions.updateCoinCurrency),
      exhaustMap((payload) => this.coinsService.getCoinCurrency(payload.id).pipe(
        map((currency: Currency) => CoinsActions.updateCoinCurrencySuccess({ id: payload.id, currency }),
          catchError(() => EMPTY)
        )
      )
      )
    )
  )

  dialogOpened$ = createEffect(() => this.actions$.pipe(
    ofType(CoinsActions.openCoinsDialog),
    tap(payload => {
      this.dialog.open(CoinsDialogComponent)
    })
  ), { dispatch: false })
}
