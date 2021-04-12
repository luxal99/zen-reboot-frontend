import {Component, OnInit, ViewChild} from '@angular/core';
import {City} from '../../../../../models/city';
import {CityService} from '../../../../../service/city.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../../../../service/location.service';
import {Location} from 'src/app/models/location';
import {DefaultComponent} from '../../../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FieldConfig} from '../../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../../const/const';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.sass']
})
export class AddLocationDialogComponent extends DefaultComponent<Location> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  locationForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  streetInputConfig: FieldConfig = {name: FormControlNames.STREET_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  nameInputConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  streetNumberInputConfig: FieldConfig = {name: FormControlNames.NUMBER_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  citySelectConfig: FieldConfig = {name: FormControlNames.CITY_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(private cityService: CityService, private locationService: LocationService, protected snackBar: MatSnackBar) {
    super(locationService, snackBar);
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.cityService.getAll().subscribe((resp) => {
      this.citySelectConfig.options = resp;
    });
  }

  save(): void {
    const location: Location = this.locationForm.getRawValue();
    location.address = this.addressForm.getRawValue();
    super.subscribeSave(location);
  }
}
