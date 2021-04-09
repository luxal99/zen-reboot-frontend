import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatTab} from '@angular/material/tabs';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {StaffOverviewComponent} from './staff-overview/staff-overview.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.sass']
})
export class StaffComponent implements OnInit {

  @ViewChild('staffOverviewTab') staffOverviewTab!: MatTab;

  @ViewChild('staffOverviewTarget', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  loadStaffOverviewComponent(): void {
    if (this.staffOverviewTab.isActive) {
      LazyLoadComponentsUtil.loadComponent(StaffOverviewComponent, this.entry, this.resolver);
    }
  }

}
