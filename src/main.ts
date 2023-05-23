import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app/app.routs';
import { AppComponent } from './app/app.component';

import { coinsReducer } from './app/ngrx/coins/coins.reducer';
import { coinsFeatureKey } from './app/ngrx/coins/coins.state';
import { CoinsEffects } from './app/ngrx/coins/coins.effects';
import { DIALOG_DATA } from '@angular/cdk/dialog';

bootstrapApplication(AppComponent, {
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
})
  .catch(err => console.error(err));
