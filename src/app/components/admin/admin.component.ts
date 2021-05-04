import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {LazyLoadComponentsUtil} from '../../util/lazy-loading-components';
import {OverviewComponent} from './overview/overview.component';
import {ClientComponent} from './client/client.component';
import {CodeBookComponent} from './code-book/code-book.component';
import {ServicesComponent} from './services/services.component';
import {StaffComponent} from './staff/staff.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {InvoiceOverviewComponent} from './invoice-overview/invoice-overview.component';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild('sideNav', {static: false}) sideNav!: ElementRef;
  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;
  @ViewChild('target', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;
  header = 'Pregled';

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDefaultMenu();
  }


  openSideNav(): void {
    if (this.sideNav.nativeElement.style.width === '300px') {
      // @ts-ignore
      document.getElementById('menu-icon').style.transform = 'rotate(90deg)';
      this.sideNav.nativeElement.style.maxWidth = '80px';
      this.sideNav.nativeElement.style.width = '80px';
    } else {

      // @ts-ignore
      document.getElementById('menu-icon').style.transform = 'rotate(-90deg)';
      this.sideNav.nativeElement.style.maxWidth = '300px';
      this.sideNav.nativeElement.style.width = '300px';
    }
  }

  initDefaultMenu(): void {
    setTimeout(() => {
      if (window.screen.width <= 700) {
        // @ts-ignore
        document.getElementById('overview-side-btn').click();
      } else {
        // @ts-ignore
        document.getElementById('overview-btn').click();
      }
    }, 10);
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

  loadOverviewComponent(): void {
    this.closeDrawer().then(() => {
      this.setHeader('Pregled');
      LazyLoadComponentsUtil.loadComponent(OverviewComponent, this.entry, this.resolver);
    });
  }

  loadCodeBookComponent(): void {
    this.closeDrawer().then(() => {
      this.setHeader('Šifarnik');
      LazyLoadComponentsUtil.loadComponent(CodeBookComponent, this.entry, this.resolver);
    });
  }

  loadClientComponent(): void {
    this.closeDrawer().then(() => {
      this.setHeader('Klijenti');
      LazyLoadComponentsUtil.loadComponent(ClientComponent, this.entry, this.resolver);
    });
  }

  loadStaffComponent(): void {
    this.closeDrawer().then(() => {
      this.header = 'Zaposleni';
      LazyLoadComponentsUtil.loadComponent(StaffComponent, this.entry, this.resolver);

    });
  }

  loadServiceComponent(): void {
    this.closeDrawer().then(() => {
      this.setHeader('Tretmani');
      LazyLoadComponentsUtil.loadComponent(ServicesComponent, this.entry, this.resolver);
    });
  }

  loadInvoiceComponent(): void {
    this.closeDrawer().then(() => {
      this.setHeader('Fakture');
      LazyLoadComponentsUtil.loadComponent(InvoiceOverviewComponent, this.entry, this.resolver);
    });
  }

  loadAppointmentComponent(): void {
    setTimeout(() => {
      this.closeDrawer().then(() => {
        this.setHeader('Kalendar');
        LazyLoadComponentsUtil.loadComponent(AppointmentComponent, this.entry, this.resolver);
      });
    }, 200);
  }

  async closeDrawer(): Promise<void> {
    if (window.screen.width <= 960) {
      await this.drawer.close();
    }
  }

  private setHeader(text: string): void {
    this.header = text;
  }
}
