import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatTab} from '@angular/material/tabs';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {CountriesOverviewComponent} from './countries-overview/countries-overview.component';
import {LocationOverviewComponent} from './location-overview/location-overview.component';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  @ViewChild('countriesTab') countriesTab!: MatTab;
  @ViewChild('countriesOverview', {read: ViewContainerRef, static: false}) countriesOverviewEntry!: ViewContainerRef;

  @ViewChild('locationTab') locationTab!: MatTab;
  @ViewChild('locationOverview', {read: ViewContainerRef, static: false}) locationOverview!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  loadActivatedComponent(): void {
    setTimeout(() => {
      if (this.countriesTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(CountriesOverviewComponent, this.countriesOverviewEntry, this.resolver);
      } else if (this.locationTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(LocationOverviewComponent, this.locationOverview, this.resolver);
      }
    }, 250);
  }


}
