import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextSize]'
})
export class TextSizeDirective implements OnInit {

  @Input() length: number
  @HostBinding("style.fontSize") public fontSize: string;

  constructor() {
  }

  ngOnInit() {

    if (this.length < 30) {
      this.fontSize = "30px"
    }
    else {
      this.fontSize = "15px"

    }
  }




}
