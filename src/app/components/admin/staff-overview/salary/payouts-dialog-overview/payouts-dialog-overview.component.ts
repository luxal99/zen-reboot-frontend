import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StaffPayoutDto} from "../../../../../models/dto/staff-payout-dto";

@Component({
  selector: "app-payouts-dialog-overview",
  templateUrl: "./payouts-dialog-overview.component.html",
  styleUrls: ["./payouts-dialog-overview.component.sass"]
})
export class PayoutsDialogOverviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StaffPayoutDto) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
