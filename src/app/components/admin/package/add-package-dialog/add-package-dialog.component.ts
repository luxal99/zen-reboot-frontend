import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Package} from '../../../../models/package';
import {PackageService} from '../../../../service/package.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../../models/client';

@Component({
  selector: 'app-add-package-dialog',
  templateUrl: './add-package-dialog.component.html',
  styleUrls: ['./add-package-dialog.component.sass']
})
export class AddPackageDialogComponent extends DefaultComponent<Package> implements OnInit {

  selectedClient: Client = {};
  packageForm = new FormGroup({
    count: new FormControl('', Validators.required),
    discount: new FormControl(''),
    location: new FormControl(''),
    startDate: new FormControl(new Date(), Validators.required),
    treatmentDuration: new FormControl('', Validators.required)
  });



  constructor(private packageService: PackageService, protected snackBar: MatSnackBar) {
    super(packageService, snackBar);
  }

  ngOnInit(): void {
  }

  save(): void {

  }

}
