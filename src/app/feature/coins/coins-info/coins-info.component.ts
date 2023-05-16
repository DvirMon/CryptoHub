import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { CurrencyModel } from 'src/app/models/currency.model';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';

@Component({
  selector: 'app-coins-info',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TypographyComponent],
  templateUrl: './coins-info.component.html',
  styleUrls: ['./coins-info.component.scss']
})
export class CoinsInfoComponent {

  @Input() info!: CurrencyModel

  template!: (keyof CurrencyModel)[];

  ngOnInit(): void {

    this.template = this.setTemplate();

  }

  private setTemplate(): (keyof CurrencyModel)[] {
    const arr = Object.keys(this.info);
    arr.pop()
    return arr as (keyof CurrencyModel)[]
  }

}
