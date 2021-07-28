import {Component, OnInit, ViewChild} from "@angular/core";
import {PayoutService} from "../../../../service/payout.service";
import {MatSpinner} from "@angular/material/progress-spinner";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {StaffPayoutDto} from "../../../../models/dto/staff-payout-dto";
import {SpinnerService} from "../../../../service/spinner.service";
import {FieldConfig} from "../../../../models/util/FIeldConfig";
import {FormControlNames, InputTypes, MONTHS_OF_YEAR, YEARS} from "../../../../const/const";
import {DialogUtil} from "../../../../util/dialog-util";
import {PayoutsDialogOverviewComponent} from "./payouts-dialog-overview/payouts-dialog-overview.component";
import {setDialogConfig} from "../../../../util/dialog-options";

@Component({
  selector: "app-salary",
  templateUrl: "./salary.component.html",
  styleUrls: ["./salary.component.sass"]
})
export class SalaryComponent implements OnInit {

  listOfStaffs: StaffPayoutDto[] = [];
  @ViewChild("spinner") spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl(""),
    month: new FormControl(""),
    year: new FormControl("")
  });

  searchText = "";

  monthsSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.MONTH,
    options: MONTHS_OF_YEAR
  };

  yearSelectConfig: FieldConfig = {
    type: InputTypes.SELECT_TYPE_NAME,
    name: FormControlNames.YEAR,
    options: YEARS
  };

  constructor(private payoutService: PayoutService,
              private dialog: MatDialog, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getStaffSalary();
  }

  getStaffSalary(): void {
    const month = this.searchForm.get(FormControlNames.MONTH)?.value ? this.searchForm.get(FormControlNames.MONTH)?.value.value : "";
    const year = this.searchForm.get(FormControlNames.YEAR)?.value ? this.searchForm.get(FormControlNames.YEAR)?.value : "";
    this.payoutService.getStaffSalary(month, year).subscribe((resp) => {
      this.listOfStaffs = resp;
      this.spinnerService.hide(this.spinner);
    });
  }

  filter(): void {
    this.spinnerService.show(this.spinner);
    this.getStaffSalary();
  }

  openPayoutsOverviewDialog(staffPayoutDto: StaffPayoutDto): void {
    DialogUtil.openDialog(PayoutsDialogOverviewComponent, setDialogConfig({
      position: {right: "0"},
      height: "100vh"
    }), this.dialog);
  }

}
