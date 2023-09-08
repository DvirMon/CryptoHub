import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { appRoutes } from './app.routs';

import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatDialogModule, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CoinsEffects } from './ngrx/coins/coins.effects';
import { coinsReducer } from './ngrx/coins/coins.reducer';
import { coinsFeatureKey } from './ngrx/coins/coins.state';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatDialogModule,
    ),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ [coinsFeatureKey]: coinsReducer }),
    provideEffects(CoinsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    { provide: MAT_DIALOG_DATA, useValue: DIALOG_DATA },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MatDialogConfig },
  ],
}
