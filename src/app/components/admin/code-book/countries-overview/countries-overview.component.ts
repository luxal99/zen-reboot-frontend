import {Component, OnInit, ViewChild} from '@angular/core';
import {Country} from '../../../../models/country';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Validators} from '@angular/forms';
import {DialogUtil} from '../../../../util/dialog-util';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {City} from '../../../../models/city';
import {DefaultComponent} from '../../../../util/default-component';
import {CountryService} from '../../../../service/country.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {CityService} from '../../../../service/city.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {setDialogConfig} from '../../../../util/dialog-options';

@Component({
  selector: 'app-countries-overview',
  templateUrl: './countries-overview.component.html',
  styleUrls: ['./countries-overview.component.sass']
})
export class CountriesOverviewComponent extends DefaultComponent<Country> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfCities: City[] = [];

  constructor(private countryService: CountryService, protected snackBar: MatSnackBar,
              private dialog: MatDialog, private cityService: CityService) {
    super(countryService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getCities();
  }

  getCities(): void {
    this.cityService.getAll().subscribe((resp) => {
      this.listOfCities = resp;
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

    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: configData
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  openAddCityDialog(city?: City): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Naziv grada'
      }, {
        name: FormControlNames.COUNTRY_FORM_CONTROL,
        type: InputTypes.SELECT_TYPE_NAME,
        validation: [Validators.required],
        options: this.listOfItems,
        label: 'Izaberi državu'
      }],
      formValues: city,
      headerText: 'Dodaj grad',
      service: this.cityService
    };

    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: configData
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  deleteCountry(id: number): void {
    super.subscribeDelete(id);
  }

  deleteCity(id: number): void {
    // @ts-ignore
    super.subscribeDelete(id, this.cityService, () => {
      this.getCities();
    });
  }
}
