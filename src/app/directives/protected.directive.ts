import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AuthGuard} from '../guards/auth.guard';
import {RoleEnum} from '../enums/RoleEnum';

@Directive({
  selector: '[appProtected]'
})
export class ProtectedDirective implements OnInit {

  @Input() roleActivator: RoleEnum[] = [];

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.protectComponent();
  }

  async protectComponent(): Promise<void> {
    AuthGuard.getAuthUser().then((resp) => {
      const roleActivatorAsString = this.roleActivator.map((item) => (item.toString()));
      if (this.roleActivator.length > 0) {
        // @ts-ignore
        const found: boolean = resp.roles.some((item) => roleActivatorAsString.indexOf(item) >= 0);
        console.log(found);
        if (!found) {
          this.host.nativeElement.remove();
        }
      }
    });

  }

}
