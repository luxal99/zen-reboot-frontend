import {Component, OnInit, ViewChild} from "@angular/core";
import {DefaultComponent} from "../../../../util/default-component";
import {Staff} from "../../../../models/entity/staff";
import {MatSpinner} from "@angular/material/progress-spinner";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {StaffService} from "../../../../service/staff.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleSettings} from "../../../../const/const";
import {DialogUtil} from "../../../../util/dialog-util";
import {AddStaffDialogComponent} from "../add-staff-dialog/add-staff-dialog.component";
import {setDialogConfig} from "../../../../util/dialog-options";
import {StaffPayoutDto} from "../../../../models/dto/staff-payout-dto";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.sass"]
})
export class StaffComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild("spinner") spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl("")
  });

  searchText = "";

  constructor(private dialog: MatDialog, private staffService: StaffService,
              protected snackBar: MatSnackBar, public roleSetting: RoleSettings) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddStaffDialog(data?: Staff): void {
    DialogUtil.openDialog(AddStaffDialogComponent, setDialogConfig({
      height: "80%",
      width: "40%",
      data
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

}
