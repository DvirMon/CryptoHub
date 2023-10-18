import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
  standalone: true
})
export class SkeletonDirective {


  @Input() set appSkeleton(type: string) {

    this.renderer.addClass(this.el.nativeElement, 'skeleton');

    switch (type) {
      case 'text':
        this.renderer.addClass(this.el.nativeElement, 'skeleton-text');
        break;
      case 'span':
        this.renderer.addClass(this.el.nativeElement, 'skeleton-span');
        break;
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}
