import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogHost]',
  standalone: true
})
export class DialogHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
