import {Component, OnInit, ViewChild} from "@angular/core";
import {PayoutService} from "../../../../service/payout.service";
import {MatSpinner} from "@angular/material/progress-spinner";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {StaffPayoutDto} from "../../../../models/staff-payout-dto";
import {SpinnerService} from "../../../../service/spinner.service";

@Component({
  selector: "app-salary",
  templateUrl: "./salary.component.html",
  styleUrls: ["./salary.component.sass"]
})
export class SalaryComponent implements OnInit {


  listOfStaffs: StaffPayoutDto[] = [];
  @ViewChild("spinner") spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl("")
  });

  searchText = "";

  constructor(private payoutService: PayoutService,
              private dialog: MatDialog, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getStaffSalary();
    }, 100);
  }

  getStaffSalary(): void {
    this.payoutService.getStaffSalary().subscribe((resp) => {
      this.listOfStaffs = resp;
      this.spinnerService.hide(this.spinner);
    });
  }
}
