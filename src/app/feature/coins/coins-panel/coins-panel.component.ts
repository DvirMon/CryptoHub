import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Coin } from 'src/app/models/coin.model';
import { CoinsInfoComponent } from '../coins-info/coins-info.component';
import { Currency } from 'src/app/models/currency.model';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';


export interface PanelChangedEvent {
  expended: boolean;
  selected: boolean;
  panelId: string
}

@Component({
  selector: 'app-coins-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatSlideToggleModule, MatIconModule, CoinsInfoComponent],
  templateUrl: './coins-panel.component.html',
  styleUrls: ['./coins-panel.component.scss']
})
export class CoinsPanelComponent {

  @Input() coin!: Coin
  @Input() info!: Currency | undefined


  panelChangedEvent!: PanelChangedEvent;

  @Output() expended: EventEmitter<PanelChangedEvent> = new EventEmitter()
  @Output() selected: EventEmitter<PanelChangedEvent> = new EventEmitter()

  ngOnInit() {
    this.panelChangedEvent = {
      expended: false,
      selected: false,
      panelId: this.coin?.id
    }

  }

  public onExpandChanged(value: boolean) {

    const event = this.onChangedEvent(value, 'expended')

    if (value) {
      this.expended.emit(event)
    }

  }

  public onToggleChanged(event: MatSlideToggleChange): void {
    this.selected.emit(this.onChangedEvent(event.checked, 'selected'))
  }

  private onChangedEvent(value: boolean, key: keyof PanelChangedEvent): PanelChangedEvent {
    const event = {
      ...this.panelChangedEvent,
      [key]: value
    }
    this.panelChangedEvent = { ...event }

    return event
  }


}
