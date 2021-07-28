import {Component, OnInit, ViewChild} from "@angular/core";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-cancel-appointment-dialog",
  templateUrl: "./cancel-appointment-dialog.component.html",
  styleUrls: ["./cancel-appointment-dialog.component.sass"]
})
export class CancelAppointmentDialogComponent implements OnInit {

  @ViewChild("payCheckbox") payCheckbox!: MatCheckboxChange;

  constructor(private dialogRef: MatDialogRef<CancelAppointmentDialogComponent>) {
  }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close({
      cancelAppointment: true,
      payStaff: this.payCheckbox.checked
    });
  }

  decline(): void {
    this.dialogRef.close({
      cancelAppointment: false,
      payStaff: false
    });
  }

}
