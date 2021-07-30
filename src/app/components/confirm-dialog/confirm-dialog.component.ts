import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.sass"]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }

}
