import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private showToolbarSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showToolbarSignal: WritableSignal<boolean> = signal(false);

  constructor() { }

  getToolbarSignal() : WritableSignal<boolean>{
    return this.showToolbarSignal
  }

  setToolbarSignal(value : boolean): void {
    this.showToolbarSignal.set(value)
  }
}
