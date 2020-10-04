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
import { CoinModel } from '../utilities/models/coin.model';
import { CurrencyModel } from '../utilities/models/currency.model';
import { DialogModule } from '../dialog/dialog.module';
import { ChartDotModel } from '../utilities/models/chart-dot.model';
import { ChartCardModel } from '../utilities/models/chart-card.mode';

// EXTERNAL MODULES
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';


import { TextSizeDirective } from '../utilities/directives/text-size.directive';
import { TruncatePipe } from '../utilities/pipes/truncate.pipe';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    DashboardComponent,
    TextSizeDirective,
    TruncatePipe,
    NavigationComponent
  ],
  imports: [ 
    CommonModule,
    DialogModule,
    MaterialModule,
    ScrollingModule,
    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
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
      provide: ChartDotModel,
      useValue: new ChartDotModel()
    },
    {
      provide: ChartCardModel,
      useValue: new ChartCardModel()
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
    ScrollingModule,
    MaterialModule,

    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    
    DashboardComponent,
    TextSizeDirective,
    TruncatePipe
  ]
  })
export class SharedModule { }
