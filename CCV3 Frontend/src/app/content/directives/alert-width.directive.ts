import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appAlertWidth]'
})
export class AlertWidthDirective implements OnInit{

  constructor(private elRef: ElementRef,private rendrer: Renderer2) { }
  ngOnInit()
  {
    this.rendrer.setStyle(this.elRef.nativeElement,"width","100%");
    this.rendrer.setStyle(this.elRef.nativeElement,"font-family","marker");
  }

}
