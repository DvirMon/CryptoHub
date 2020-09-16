import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface LoaderData {
  loader?: boolean,
  progress?: number
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader: Subject<LoaderData> = new Subject()

  constructor() { }

  public loaderRef() {
    return this.loader
  }
}
