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

  public gridLoader: BehaviorSubject<LoaderData> = new BehaviorSubject({ loader: true, progress: 0 })
  public expendLoader: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor() { }

}
