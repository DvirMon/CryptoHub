import { Component, EventEmitter, Input, Output, Signal, computed, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Coin } from 'src/app/models/coin.model';
import { Currency } from 'src/app/models/currency.model';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';


export interface CheckedChangedEvent {
  checked: boolean;
  coinId: string
}
export interface ExpandChangedEvent {
  expended: boolean;
  coinId: string,
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
  @Input() toggleLimit!: boolean
  @Input() toggledMap!: Signal<{ [key: string]: boolean }>

  @Output() checkedChanged: EventEmitter<CheckedChangedEvent> = new EventEmitter()
  @Output() expendChanged: EventEmitter<ExpandChangedEvent> = new EventEmitter()
  @Output() limit: EventEmitter<void> = new EventEmitter()

  private _checkedChangedEvent!: CheckedChangedEvent;
  private _expandedChangedEvent!: ExpandChangedEvent;

  public checked: Signal<boolean> = computed(() => !!this.toggledMap()[this.coin.id])

  constructor() {


  }


  ngOnInit() {
    this._checkedChangedEvent = {
      checked: false,
      coinId: this.coin.id
    }

    this._expandedChangedEvent = {
      expended: false,
      coinId: this.coin.id
    }
  }

  public onExpandChanged(value: boolean): void {

    this._onChangedEvent('expanded', value)

    if (value) {
      this.expendChanged.emit(this._expandedChangedEvent)
    }

  }

  public onToggleChanged(event: MatSlideToggleChange): void {

    const { checked, source } = event

    this._onChangedEvent('checked', event)

    if (this.toggleLimit || !checked) {
      this.checkedChanged.emit(this._checkedChangedEvent)

    } else {
      source.checked = false
      this.limit.emit();
    }
  }

  private _onChangedEvent(panelEvent: 'expanded' | 'checked', data: unknown): void {

    switch (panelEvent) {

      case 'checked':

        const event = data as MatSlideToggleChange

        this._checkedChangedEvent = {
          coinId: event.source.name as string,
          checked: event.checked
        }

        break

      case 'expanded':

        this._expandedChangedEvent = {
          ...this._expandedChangedEvent,
          expended: data as boolean
        }
        break


    }

    // const event = {
    //   ...this._panelChangedEvent,
    //   [key]: value,
    //   source
    // }
    // this._panelChangedEvent = { ...event }

    // return event
  }


}
