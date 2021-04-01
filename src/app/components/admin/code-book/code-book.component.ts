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

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfReferralSources: ReferralSource[] = [];
  listOfCountries: Country[] = [];
  listOfCities: City[] = [];

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService,
              private entry: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private referralSourceService: ReferralSourceService, private cityService: CityService,
              private snackBar: MatSnackBar, private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.getAllReferralSource();
    this.getAllCountries();
    this.getAllCities();
  }

  getAllCities(): void {
    this.cityService.getAll().subscribe((resp) => {
      this.listOfCities = resp;
    });
  }

  getAllCountries(): void {
    this.countryService.getAll().subscribe((resp) => {
      this.listOfCountries = resp;
    });
  }

  getAllReferralSource(): void {
    this.referralSourceService.getAll().subscribe((resp) => {
      // @ts-ignore
      this.listOfReferralSources = resp.map((referralSource) => ({
        id: referralSource.id,
        value: referralSource.value,
        createdDate: new Date(referralSource.createdDate),
        lastModifiedDate: new Date(referralSource.lastModifiedDate)
      }));
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddReferralSourceDialog(referralSource?: ReferralSource): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.VALUE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Dodaj razlog otkazivanja'
      }],
      formValues: referralSource,
      headerText: 'Dodaj razlog otkazivanja',
      service: this.referralSourceService

    };
    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllReferralSource();
    });
  }

  openAddCountryDialog(country?: Country): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Naziv države'
      }],
      formValues: country,
      headerText: 'Dodaj državu',
      service: this.countryService
    };

    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllCountries();
    });
  }

  deleteReferralSource(referralSource: ReferralSource): void {
    // @ts-ignore
    this.referralSourceService.delete(referralSource.id).subscribe(() => {
      this.getAllReferralSource();
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    });
  }

  deleteCountry(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.getAllCountries();
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    });
  }
}
