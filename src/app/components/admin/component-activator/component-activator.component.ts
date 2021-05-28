import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {AuthGuard} from '../../../guards/auth.guard';

@Component({
  selector: 'app-component-activator',
  templateUrl: './component-activator.component.html',
  styleUrls: ['./component-activator.component.sass'],
})
export class ComponentActivatorComponent implements OnInit {

  // tslint:disable-next-line:no-output-native
  @Output() load = new EventEmitter();

  @Input() icon = '';
  @Input() title = '';

  constructor() {
  }

  ngOnInit(): void {
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
