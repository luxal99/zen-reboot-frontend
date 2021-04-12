import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Room} from '../../../../../models/room';
import {SnackBarUtil} from '../../../../../util/snack-bar-uitl';
import {RoomService} from '../../../../../service/room.service';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.sass']
})
export class AddLocationDialogComponent extends DefaultComponent<Location> implements OnInit, AfterViewChecked {

  selectedRoom: Room = {};
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  locationForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  roomForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  streetInputConfig: FieldConfig = {name: FormControlNames.STREET_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  nameInputConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  streetNumberInputConfig: FieldConfig = {name: FormControlNames.NUMBER_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  citySelectConfig: FieldConfig = {name: FormControlNames.CITY_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Location, private cityService: CityService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private locationService: LocationService, protected snackBar: MatSnackBar, private roomService: RoomService) {
    super(locationService, snackBar);
  }

  ngOnInit(): void {
    this.getAllCities();
    this.initForm();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  initForm(): void {
    if (!this.data) {
      this.data = {};
    }
  }

  getAllCities(): void {
    this.cityService.getAll().subscribe((resp) => {
      this.citySelectConfig.options = resp;
    });
  }

  save(): void {
    const location: Location = this.locationForm.getRawValue();
    location.address = this.addressForm.getRawValue();
    if (this.data.id) {
      location.id = this.data.id;
      location.rooms = this.data.rooms;
      location.rooms?.filter((room) => {
        if (room.location) {
          delete room.location;
        }
      });
      super.subscribeUpdate(location);
    } else {
      super.subscribeSave(location);
    }
  }

  removeRoom(room: Room): void {
    this.data.rooms?.splice(this.data.rooms?.indexOf(room), 1);
  }

  selectRoom(room: Room): void {
    this.roomForm.controls.name.setValue(room.name);
    this.selectedRoom = room;
  }

  editRoom(): void {
    this.data.rooms?.filter((room) => {
      if (room.id === this.selectedRoom.id) {
        room.name = this.roomForm.get(FormControlNames.NAME_FORM_CONTROL)?.value;
      }
    });
  }

  addRoom(): void {
    const index = this.data.rooms?.indexOf(this.roomForm.getRawValue());
    if (index === -1) {
      this.data.rooms?.push(this.roomForm.getRawValue());
    } else {
      SnackBarUtil.openSnackBar(this.snackBar, 'Soba sa željenim nazivom već postoji');
    }
  }
}
