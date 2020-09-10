// IMPORT ANGULAR
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorHandler, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { ScrollingModule } from '@angular/cdk/scrolling';

// IMPORT SHARED MODULES
import { MaterialModule } from '../material/material.module';

// IMPORT COMPONENTS
import { DashboardComponent } from './components/dashboard/dashboard.component';

// INTERCEPTORS
import { SpinnerInterceptorService } from '../utilities/interceptors/spinner-interceptor.service';
import { ErrorsService } from '../utilities/interceptors/errors.service';
 
// MODELS
import { CoinModel } from '../utilities/models/coin-model';
import { CurrencyModel } from '../utilities/models/currency-model';

// EXTERNAL MODULES
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DialogModule } from '../dialog/dialog.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [ 
    CommonModule,
    DialogModule,
    MaterialModule,
    ScrollingModule,
    NgxSkeletonLoaderModule
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
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    
    DashboardComponent,
  ]
})
export class SharedModule { }
