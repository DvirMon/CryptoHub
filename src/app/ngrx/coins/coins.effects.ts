import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoinsService } from 'src/app/feature/coins/coins.service';
import { CoinsActions } from './coins.types';
import { Coin } from 'src/app/models/coin.model';
import { exhaustMap, map, catchError, of } from 'rxjs';


@Injectable()

export class CoinsEffects {

  constructor
    (
      private coinsService: CoinsService,
      private actions$: Actions

    ) { }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinsActions.loadCoins),
      exhaustMap(() => this.coinsService.getCoins()
        .pipe(
          map((coins: Coin[]) => CoinsActions.loadCoinsSuccess({ coins })),
          catchError((err) => of(CoinsActions.loadCoinsFailure({ err })))
        ))
    )
  )
}
