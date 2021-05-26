import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Package} from '../../../models/package';
import {PackageService} from '../../../service/package.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddPackageDialogComponent} from './add-package-dialog/add-package-dialog.component';
import {setDialogConfig} from '../../../util/dialog-options';

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
    DialogUtil.openDialog(AddPackageDialogComponent, setDialogConfig({
      maxHeight: '80vh',
      data: pcg ? pcg : null
    }), this.dialog).afterClosed().subscribe(() => {
      super.getItems();
    });
  }
}
