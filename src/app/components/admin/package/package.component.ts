import {Component, OnInit} from "@angular/core";
import {DefaultComponent} from "../../../util/default-component";
import {PackageService} from "../../../service/package.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogUtil} from "../../../util/dialog-util";
import {AddPackageDialogComponent} from "./add-package-dialog/add-package-dialog.component";
import {setDialogConfig} from "../../../util/dialog-options";
import {FormControl, FormGroup} from "@angular/forms";
import {Package} from "../../../models/entity/package";
import {PackageOverviewDialogComponent} from "./package-overview-dialog/package-overview-dialog.component";

@Component({
  selector: "app-package",
  templateUrl: "./package.component.html",
  styleUrls: ["./package.component.sass"]
})
export class PackageComponent extends DefaultComponent<Package> implements OnInit {
  searchText = "";
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  displayedColumns: string[] = ["code", "client", "date", "price", "option"];

  constructor(private packageService: PackageService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super(packageService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddPackageDialog(pcg?: Package): void {
    DialogUtil.openDialog(AddPackageDialogComponent, setDialogConfig({
      maxHeight: "80vh",
      data: pcg ? pcg : null
    }), this.dialog).afterClosed().subscribe(() => {
      super.getItems();
    });
  }

  openPackageOverviewDialog(element: any): void {
    DialogUtil.openDialog(PackageOverviewDialogComponent, setDialogConfig({
      height: "auto",
      width: "40%",
      data: element
    }), this.dialog);
  }
}
