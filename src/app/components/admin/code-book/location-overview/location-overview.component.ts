import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {LocationService} from '../../../../service/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogUtil} from '../../../../util/dialog-util';
import {MatDialog} from '@angular/material/dialog';
import {Location} from 'src/app/models/location';

import {AddLocationDialogComponent} from './add-location-dialog/add-location-dialog.component';

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

  openAddLocationDialog(): void {
    DialogUtil.openDialog(AddLocationDialogComponent, {
      position: {top: '6%'},
      width: '30%',
    }, this.dialog);
  }

  deleteLocation(id: number): void {
    super.subscribeDelete(id);
  }
}
