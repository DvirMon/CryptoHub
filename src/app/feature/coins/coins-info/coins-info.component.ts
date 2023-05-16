import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { Currency } from 'src/app/models/currency.model';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';

@Component({
  selector: 'app-coins-info',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TypographyComponent],
  templateUrl: './coins-info.component.html',
  styleUrls: ['./coins-info.component.scss']
})
export class CoinsInfoComponent {

  @Input() url!: string
  @Input() currency!: Currency

  template!: (keyof Currency)[];

  ngOnInit(): void {

    this.template = this.setTemplate();

  }

  private setTemplate(): (keyof Currency)[] {
    return Object.keys(this.currency) as (keyof Currency)[];
  }

}
