// IMPORT ANGULAR
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorHandler, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

// IMPORT SHARED MODULES
import { MaterialModule } from '../material/material.module';

// IMPORT COMPONENTS
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogComponent } from './components/dialog/dialog.component';

// INTERCEPTORS
import { SpinnerInterceptorService } from '../utilities/interceptors/spinner-interceptor.service';
import { ErrorsService } from '../utilities/interceptors/errors.service';
 
// MODELS
import { CoinModel } from '../utilities/models/coin-model';
import { CurrencyModel } from '../utilities/models/currency-model';


@NgModule({
  declarations: [
    DialogComponent,
    DashboardComponent
  ],
  imports: [ 
    CommonModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: CoinModel,
      useValue: new CoinModel()
    },
    {
      provide: CurrencyModel,
      useValue: new CurrencyModel()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: ErrorHandler,
      useClass: ErrorsService
    },
  ],  
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DashboardComponent,
    DialogComponent,
  ]
})
export class SharedModule { }
