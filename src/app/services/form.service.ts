import { Injectable } from '@angular/core';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActionType } from '../utilities/redux/action-type';
import { store } from '../utilities/redux/store';


@Injectable({
  providedIn: 'root'
})


export class FormService {

  public toggleSearch: Subject<boolean> = new Subject()

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }


  // LOGIC SECTION

  public handleStore(type: ActionType, payload?: any): void {
    store.dispatch({ type, payload })
  }
 
  public isHandset(): Observable<BreakpointState> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
  }

  public isMobile(): Observable<boolean> {
    return this.isHandset()
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }




}