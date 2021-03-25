import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LazyLoadComponentsUtil} from '../../util/lazy-loading-components';
import {OverviewComponent} from './overview/overview.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild('target', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;
  @ViewChild('sideNav', {static: false}) sideNav!: ElementRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDefaultMenu();
  }

  openSideNav(): void {
    if (this.sideNav.nativeElement.style.width === '300px') {
      this.sideNav.nativeElement.style.maxWidth = '80px';
      this.sideNav.nativeElement.style.width = '80px';
    } else {
      this.sideNav.nativeElement.style.maxWidth = '300px';
      this.sideNav.nativeElement.style.width = '300px';
    }
  }

  initDefaultMenu(): void {
    setTimeout(() => {
      // @ts-ignore
      document.getElementById('overview-btn').click();
    }, 10);
  }

  changeColor(e: any): void {
    console.log(e.target.classList);
    const element = document.querySelectorAll('.active');
    [].forEach.call(element, (el: any) => {
       el.classList.remove('active');
    });
    e.target.classList.add('active');
    console.log(e);
  }

  loadOverviewComponent(): void {
    LazyLoadComponentsUtil.loadComponent(OverviewComponent, this.entry, this.resolver);
  }


}
