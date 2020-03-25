import { Directive, Input, EventEmitter, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
   selector: '[focus]'
})
export class FocusDirective implements OnInit {
   @Input('focus') focusEvent: EventEmitter<boolean>;

   constructor( @Inject(ElementRef) private element: ElementRef, private renderer: Renderer2) {
   }

   ngOnInit() {
      this.focusEvent.subscribe(event => {
          this.element.nativeElement.focus();
      });
   }


}
