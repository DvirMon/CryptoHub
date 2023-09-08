import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { StoreService } from 'src/app/ngrx/store.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private showToolbarSignal: WritableSignal<boolean> = signal(true);
  private storeService: StoreService = inject(StoreService);

  public getToolbarSignal(): WritableSignal<boolean> {
    return this.showToolbarSignal
  }

  public  setToolbarSignal(value: boolean): void {
    this.showToolbarSignal.set(value)
  }

  public getSelectedCoinsAmount(): Signal<number> {
    return this.storeService.getSelectedCoinsAmount()
  }
}
