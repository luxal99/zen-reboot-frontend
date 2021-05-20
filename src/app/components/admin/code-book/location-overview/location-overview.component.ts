import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {LocationService} from '../../../../service/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogUtil} from '../../../../util/dialog-util';
import {MatDialog} from '@angular/material/dialog';
import {Location} from 'src/app/models/location';

import {AddLocationDialogComponent} from './add-location-dialog/add-location-dialog.component';
import {setDialogConfig} from '../../../../util/dialog-options';

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

  openAddLocationDialog(data?: Location): void {
    DialogUtil.openDialog(AddLocationDialogComponent, setDialogConfig({
      position: {top: '6%'},
      data,
      width: '30%',
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  deleteLocation(id: number): void {
    super.subscribeDelete(id);
  }
}
