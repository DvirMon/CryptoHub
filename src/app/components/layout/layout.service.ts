import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private showToolbarSignal: WritableSignal<boolean> = signal(true);

  constructor() { }

  getToolbarSignal() : WritableSignal<boolean>{
    return this.showToolbarSignal
  }

  setToolbarSignal(value : boolean): void {
    this.showToolbarSignal.set(value)
  }
}
