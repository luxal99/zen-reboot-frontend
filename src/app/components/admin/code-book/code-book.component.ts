import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {ReferralSourceService} from '../../../service/referral-source.service';
import {ReferralSource} from '../../../models/referral-source';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../service/spinner.service';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {FormControlNames, InputTypes, Message} from '../../../const/const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {CountryService} from '../../../service/country.service';
import {City} from '../../../models/city';
import {CityService} from '../../../service/city.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {CountriesOverviewComponent} from './countries-overview/countries-overview.component';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  @ViewChild('countriesTab') countriesTab!: MatTab;

  @ViewChild('countriesOverview', {read: ViewContainerRef, static: false}) countriesOverviewEntry!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  loadActivatedComponent(): void {
    if (this.countriesTab.isActive) {
      setTimeout(() => {
        LazyLoadComponentsUtil.loadComponent(CountriesOverviewComponent, this.countriesOverviewEntry, this.resolver);
      }, 250);
    }
  }


}
