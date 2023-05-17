import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';


export interface PanelChangedEvent {
  expended: boolean;
  checked: boolean;
  coin: Coin
}

@Component({
  selector: 'app-coins-panel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatExpansionModule, MatSlideToggleModule, MatIconModule, TypographyComponent],
  templateUrl: './coins-panel.component.html',
  styleUrls: ['./coins-panel.component.scss']
})
export class CoinsPanelComponent {

  @Input() coin!: Coin
  @Input() currency!: Currency

  private _panelChangedEvent!: PanelChangedEvent;

  @Output() expended: EventEmitter<PanelChangedEvent> = new EventEmitter()
  @Output() selected: EventEmitter<PanelChangedEvent> = new EventEmitter()

  ngOnInit() {
    this._panelChangedEvent = {
      expended: false,
      checked: false,
      coin: this.coin
    }

  }

  public onExpandChanged(value: boolean): void {

    const event = this._onChangedEvent(value, 'expended')

    if (value) {
      this.expended.emit(event)
    }

  }

  public onToggleChanged(event: MatSlideToggleChange): void {
    this.selected.emit(this._onChangedEvent(event.checked, 'checked'))
  }

  private _onChangedEvent(value: boolean, key: keyof PanelChangedEvent): PanelChangedEvent {
    const event = {
      ...this._panelChangedEvent,
      [key]: value
    }
    this._panelChangedEvent = { ...event }

    return event
  }


}
