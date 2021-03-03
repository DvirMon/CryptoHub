import { AfterContentChecked, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})

export class ParallaxDirective implements OnInit {

  @Input('ratio') parallaxRatio : number = 1
  initialTop : number = 0

  constructor(private eleRef : ElementRef) {
  }

  ngOnInit() {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top
    console.log(this.initialTop)
}

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event){
    this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px'
  }

}
