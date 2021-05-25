import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Package} from '../../../models/package';
import {PackageService} from '../../../service/package.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.sass']
})
export class PackageComponent extends DefaultComponent<Package> implements OnInit {

  constructor(private packageService: PackageService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super(packageService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddPackageDialog(pcg?: Package): void {

  }
}
