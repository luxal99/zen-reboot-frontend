import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StaffPayoutDto} from "../../../../../models/dto/staff-payout-dto";
import {AppointmentDTO} from "../../../../../models/dto/AppointmentDTO";
import {Client} from "../../../../../models/entity/client";
import {DialogUtil} from "../../../../../util/dialog-util";
import {AppointmentOverviewDialogComponent} from "../../../appointment/appointment-overview-dialog/appointment-overview-dialog.component";
import {setDialogConfig} from "../../../../../util/dialog-options";
import {ClientOverviewDialogComponent} from "../../../client/client-overview-dialog/client-overview-dialog.component";

@Component({
  selector: "app-payouts-dialog-overview",
  templateUrl: "./payouts-dialog-overview.component.html",
  styleUrls: ["./payouts-dialog-overview.component.sass"]
})
export class PayoutsDialogOverviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StaffPayoutDto,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  openAppointmentOverviewDialog(appointment: AppointmentDTO): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent, setDialogConfig({
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "100%",
      width: "100%",
      data: appointment
    }), this.dialog);
  }

  openClientOverviewDialog(data: Client): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent,
      setDialogConfig({
        position: {right: "0"},
        width: "95%",
        height: "100vh",
        data
      }), this.dialog);
  }

}
