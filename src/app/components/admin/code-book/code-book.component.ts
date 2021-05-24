import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatTab} from '@angular/material/tabs';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {CountriesOverviewComponent} from './countries-overview/countries-overview.component';
import {LocationOverviewComponent} from './location-overview/location-overview.component';
import {AppointmentStatusOverviewComponent} from './appointment-status-overview/appointment-status-overview.component';
import {ExpenseTypeOverviewComponent} from './expense-type-overview/expense-type-overview.component';
import {FieldConfig} from '../../../models/FIeldConfig';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import {Validators} from '@angular/forms';
import {ReferralSourceService} from '../../../service/referral-source.service';

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

  @ViewChild('appointmentStatusTab') appointmentStatusTab!: MatTab;
  @ViewChild('appointmentStatusOverview', {read: ViewContainerRef, static: false}) appointmentStatusOverview!: ViewContainerRef;
  @ViewChild('expenseTypeTab') expenseTypeTab!: MatTab;
  @ViewChild('expenseTypeOverview', {read: ViewContainerRef, static: false}) expenseTypeOverview!: ViewContainerRef;


  referralSourceConfig: FormBuilderConfig = {
    formFields: [{
      name: FormControlNames.VALUE_FORM_CONTROL,
      type: InputTypes.INPUT_TYPE_NAME,
      validation: [Validators.required],
      label: 'Dodaj razlog otkazivanja'
    }],
    headerText: 'Dodaj razlog otkazivanja',
    service: this.referralSourceService

  };

  constructor(private resolver: ComponentFactoryResolver, public referralSourceService: ReferralSourceService) {
  }

  ngOnInit(): void {

  }

  loadActivatedComponent(): void {
    setTimeout(() => {
      if (this.countriesTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(CountriesOverviewComponent, this.countriesOverviewEntry, this.resolver);
      } else if (this.locationTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(LocationOverviewComponent, this.locationOverview, this.resolver);
      } else if (this.appointmentStatusTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(AppointmentStatusOverviewComponent, this.appointmentStatusOverview, this.resolver);
      } else if (this.expenseTypeTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(ExpenseTypeOverviewComponent, this.expenseTypeOverview, this.resolver);
      }
    }, 250);
  }


}
