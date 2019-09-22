import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHeadings]'
})
export class HeadingsDirective {

  constructor(private elRef: ElementRef,private rendrer: Renderer2) {
    this.rendrer.setStyle(this.elRef.nativeElement,"font-size","30px");
    // this.rendrer.setStyle(this.elRef.nativeElement,"font-family","write");
    // this.rendrer.setStyle(this.elRef.nativeElement,"color","green");
   }

}
