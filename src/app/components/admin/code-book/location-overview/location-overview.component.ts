import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {LocationService} from '../../../../service/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogUtil} from '../../../../util/dialog-util';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-location-overview',
  templateUrl: './location-overview.component.html',
  styleUrls: ['./location-overview.component.sass']
})
export class LocationOverviewComponent extends DefaultComponent<Location> implements OnInit {

  constructor(private locationService: LocationService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super(locationService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddLocationDialog(location?: Location): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.VALUE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Dodaj lokaciju'
      }],
      formValues: location,
      headerText: 'Dodaj lokaciju',
      service: this.locationService

    };
    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog);
  }

}
