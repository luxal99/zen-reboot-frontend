import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Package} from "../../../../models/entity/package";
import {DialogUtil} from "../../../../util/dialog-util";
import {ClientOverviewDialogComponent} from "../../client/client-overview-dialog/client-overview-dialog.component";
import {setDialogConfig} from "../../../../util/dialog-options";
import {AddPackageDialogComponent} from "../add-package-dialog/add-package-dialog.component";

@Component({
  selector: "app-package-overview-dialog",
  templateUrl: "./package-overview-dialog.component.html",
  styleUrls: ["./package-overview-dialog.component.sass"]
})
export class PackageOverviewDialogComponent implements OnInit {

  @Input() pcg!: Package;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Package,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.pcg) {
      this.data = this.pcg;
    }
  }

  openClientOverviewDialog(): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, setDialogConfig({
      position: {right: "0"},
      width: "95%",
      height: "100vh",
      data: this.data.client
    }), this.dialog);
  }

  openEditPackageDialog(): void {
    DialogUtil.openDialog(AddPackageDialogComponent, setDialogConfig({
      height: "auto",
      width: "40%",
      data: this.data
    }), this.dialog);
  }
}
