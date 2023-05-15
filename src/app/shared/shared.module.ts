import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { TypographyComponent } from './components/typography/typography.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
