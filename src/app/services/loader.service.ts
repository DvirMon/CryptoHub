import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoaderData {
  loader?: boolean,
  progress?: number
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader: BehaviorSubject<LoaderData> = new BehaviorSubject({ loader: true, progress: 0 })

  constructor() { }

  public loaderRef() {
    return this.loader
  }
}
