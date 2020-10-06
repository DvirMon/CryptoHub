//  ANGULAR MODULES
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';

// ANGULAR CDK
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

// ANGULAR MATERIAL MODULES
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

// INTERCEPTORS
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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

// DIRECTIVES & PIPES
import { TextSizeDirective } from '../utilities/directives/text-size.directive';
import { TruncatePipe } from '../utilities/pipes/truncate.pipe';


@NgModule({
  declarations: [
    TextSizeDirective,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    DialogModule,
    MaterialModule,
    ScrollingModule,
    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    LayoutModule,
  ],
  providers: [

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
    ScrollingModule,
    MaterialModule,

    NgxSkeletonLoaderModule,
    VirtualScrollerModule,

    TextSizeDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
