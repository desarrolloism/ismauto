import { Directive, HostListener, ElementRef } from '@angular/core';


@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onInputChange(event: any) {
    const allowedKeys = [8, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    if (!allowedKeys.includes(event.keyCode)) {
      event.preventDefault();
    }
  }
}
