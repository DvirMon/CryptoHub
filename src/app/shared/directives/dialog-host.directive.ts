import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogHost]',
  standalone: true
})
export class DialogHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
