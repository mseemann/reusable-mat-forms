import { AfterViewChecked, Directive, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matTooltip][appShowAsTooltipIfNotCompletelyVisible]',
})
export class ShowAsTooltipIfNotCompletelyVisibleDirective implements AfterViewChecked {
  constructor(private el: ElementRef, private matTooltip: MatTooltip) {}

  ngAfterViewChecked(): void {
    const parentEl: HTMLElement = this.el.nativeElement.parentElement;
    const isWiderThanItsParent = parentEl.scrollWidth > parentEl.offsetWidth;
    this.matTooltip.message = isWiderThanItsParent ? this.el.nativeElement.textContent : '';
  }
}
