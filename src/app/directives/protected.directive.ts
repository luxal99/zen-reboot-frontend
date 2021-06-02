import { Directive } from '@angular/core';

@Directive({
  selector: '[appProtected]'
})
export class ProtectedDirective {

  constructor() { }

}
