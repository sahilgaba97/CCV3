import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appNotesTemplate]'
})
export class NotesTemplateDirective {

  constructor(private elRef: ElementRef,private rendrer: Renderer2) { 
    // this.rendrer.setStyle(this.elRef.nativeElement,"width","30%");
    // this.rendrer.setStyle(this.elRef.nativeElement,"width","100%");
    // this.rendrer.setStyle(this.elRef.nativeElement,"margin","20px auto");
  }

}
