//  ANGULAR MODULES
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms'
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
import { DialogModule } from '../dialog/dialog.module';

// EXTERNAL MODULES
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// DIRECTIVES & PIPES
import { TextSizeDirective } from './directives/text-size.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ParallaxDirective } from './directives/parallax.directive';


@NgModule({
  declarations: [
    TextSizeDirective,
    ParallaxDirective,
    TruncatePipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    DialogModule,
    MaterialModule,
    ScrollingModule,
    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    FontAwesomeModule,
    LayoutModule,
  ],
  providers: [
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
    FormsModule,
    ScrollingModule,
    MaterialModule,

    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    FontAwesomeModule,

    ParallaxDirective,
    TextSizeDirective,
    TruncatePipe,
    FilterPipe,
  ]
})
export class SharedModule { }
