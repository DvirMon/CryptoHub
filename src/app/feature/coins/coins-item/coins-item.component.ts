import { Component, EventEmitter, Input, Output, Signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {  MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { Coin, Currency } from '../store/coin.model';


export interface CheckedChangedEvent {
  checked: boolean;
  coinId: string
}

export interface ExpandChangedEvent {
  expanded: boolean;
  coinId: string,
}

@Component({
  selector: 'app-coins-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatExpansionModule, MatSlideToggleModule, MatIconModule, TypographyComponent],
  templateUrl: './coins-item.component.html',
  styleUrls: ['./coins-item.component.scss']
})
export class CoinsItemComponent {

  @Input() coin!: Coin
  @Input() currency!: Currency
  @Input() toggleLimit!: boolean
  @Input() selectedMap!: Signal<Record<string, boolean>>

  @Output() checkedChanged: EventEmitter<CheckedChangedEvent> = new EventEmitter()
  @Output() expendChanged: EventEmitter<ExpandChangedEvent> = new EventEmitter()
  @Output() limit: EventEmitter<void> = new EventEmitter()


  public checked: Signal<boolean> = computed(() => !!this.selectedMap()[this.coin.symbol])

  public onExpandChanged(value: boolean, coinId: string): void {
    const expandChangedEvent = this._handleExpandedEvent(value, coinId)
    this._emitExpandChanged(expandChangedEvent)
  }

  private _emitExpandChanged(event: ExpandChangedEvent): void {
    this.expendChanged.emit(event)
  }

  private _handleExpandedEvent(expanded: boolean, coinId: string): ExpandChangedEvent {
    return {
      coinId,
      expanded
    };
  }

  public onToggleChanged(event: MatSlideToggleChange): void {

    const { checked, source } = event

    if (this.toggleLimit || !checked) {
      const checkedChangedEvent = this._handleCheckedEvent(event);
      this._emitCheckedChanged(checkedChangedEvent)

    } else {
      source.toggle()

      this.limit.emit();
    }
  }

  private _emitCheckedChanged(event: CheckedChangedEvent): void {
    this.checkedChanged.emit((event))
  }


  private _handleCheckedEvent(event: MatSlideToggleChange): CheckedChangedEvent {
    return {
      coinId: event.source.name as string,
      checked: event.checked
    };
  }


}
