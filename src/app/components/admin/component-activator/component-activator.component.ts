import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthGuard} from '../../../guards/auth.guard';
import {RoleEnum} from '../../../enums/RoleEnum';

@Component({
  selector: 'app-component-activator',
  templateUrl: './component-activator.component.html',
  styleUrls: ['./component-activator.component.sass']
})
export class ComponentActivatorComponent implements OnInit {

  // tslint:disable-next-line:no-output-native
  @Output() load = new EventEmitter();

  @Input() icon = '';
  @Input() title = '';
  @Input() roleActivator: RoleEnum[] = [];

  constructor(private host: ElementRef<HTMLElement>) {
  }

  async ngOnInit(): Promise<void> {
    await this.protectComponent();
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


  changeColor(forwardedElement: any): void {
    const element = document.querySelectorAll('.active');
    [].forEach.call(element, (el: any) => {
      el.classList.remove('active');
    });
    const elementWithClassList: HTMLElement[] = forwardedElement.path.filter((x: HTMLElement) => x.classList !== undefined);
    for (const mainElement of elementWithClassList) {
      mainElement.classList.forEach(className => {
        if (className === 'a-h2') {
          mainElement.classList.add('active');
        }
      });
    }
  }

  loadComponent(): void {
    this.load.emit(true);
  }
}
