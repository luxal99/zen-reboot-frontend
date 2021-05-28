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
import {ComponentType} from '@angular/cdk/portal';
import {VouchersComponent} from './vouchers/vouchers.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {PackageComponent} from './package/package.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {UserService} from '../../service/user.service';
import {AuthGuard} from '../../guards/auth.guard';
import {RoleEnum} from '../../enums/RoleEnum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit, AfterViewInit {

  ROLE_ADMIN = RoleEnum.ADMIN;
  ROLE_RECEPTIONIST = RoleEnum.RECEPTIONIST;
  ROLE_THERAPIST = RoleEnum.THERAPIST;

  @ViewChild('sideNav', {static: false}) sideNav!: ElementRef;
  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;
  @ViewChild('target', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;
  header = 'Pregled';


  constructor(private resolver: ComponentFactoryResolver, private userService: UserService) {
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
    this.genericLoadComponent('Pregled', OverviewComponent);
  }

  loadAnalyticsComponent(): void {
    this.genericLoadComponent('Analitika', AnalyticsComponent);
  }

  loadCodeBookComponent(): void {
    this.genericLoadComponent('Šifarnik', CodeBookComponent);
  }

  loadClientComponent(): void {
    this.genericLoadComponent('Klijenti', ClientComponent);
  }

  loadStaffComponent(): void {
    this.genericLoadComponent('Zaposleni', StaffComponent);
  }

  loadServiceComponent(): void {
    this.genericLoadComponent('Tretmani', ServicesComponent);
  }

  loadInvoiceComponent(): void {
    this.genericLoadComponent('Fakture', InvoiceOverviewComponent);
  }

  loadPackageComponent(): void {
    this.genericLoadComponent('Paketi', PackageComponent);
  }

  loadAppointmentComponent(): void {
    setTimeout(() => {
      this.closeDrawer().then(() => {
        this.setHeader('Kalendar');
        LazyLoadComponentsUtil.loadComponent(AppointmentComponent, this.entry, this.resolver);
      });
    }, 200);
  }


  loadVouchersComponent(): void {
    this.genericLoadComponent('Vaučeri', VouchersComponent);
  }

  loadExpensesComponent(): void {
    this.genericLoadComponent('Troškovi', ExpensesComponent);
  }


  genericLoadComponent(header: string, component: ComponentType<any>): void {
    this.closeDrawer().then(() => {
      this.setHeader(header);
      LazyLoadComponentsUtil.loadComponent(component, this.entry, this.resolver);
    });
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
