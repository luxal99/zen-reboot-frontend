import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {MatSpinner} from "@angular/material/progress-spinner";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {StaffService} from "../../../service/staff.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Staff} from "../../../models/staff";
import {DialogUtil} from "../../../util/dialog-util";
import {AddStaffDialogComponent} from "./add-staff-dialog/add-staff-dialog.component";
import {DefaultComponent} from "../../../util/default-component";
import {RoleSettings} from "../../../const/const";
import {setDialogConfig} from "../../../util/dialog-options";
import {LazyLoadComponentsUtil} from "../../../util/lazy-loading-components";
import {StaffComponent} from "./staff/staff.component";
import {SalaryComponent} from "./salary/salary.component";

@Component({
  selector: "app-staff-overview",
  templateUrl: "./staff-overview.component.html",
  styleUrls: ["./staff-overview.component.sass"],
  providers: [RoleSettings]
})
export class StaffOverviewComponent extends DefaultComponent<Staff> implements OnInit {

  @ViewChild("target", {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;

  constructor(private dialog: MatDialog, private staffService: StaffService,
              protected snackBar: MatSnackBar, public roleSetting: RoleSettings,
              private resolver: ComponentFactoryResolver) {
    super(staffService, snackBar);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadStaff();
    }, 100);
  }

  loadStaff(event?: any): void {
    LazyLoadComponentsUtil.loadComponent(StaffComponent, this.entry, this.resolver);
    if (event) {
      this.changeTabColor(event);
    }
  }

  loadSalary(event?: any): void {
    LazyLoadComponentsUtil.loadComponent(SalaryComponent, this.entry, this.resolver);
    this.changeTabColor(event);
  }

  changeTabColor(forwardedElement: any): void {
    const element = document.querySelectorAll(".tab-active");
    [].forEach.call(element, (el: any) => {
      el.classList.remove("tab-active");
      el.classList.add("tab-inactive");
    });
    forwardedElement.target.className = "tab-active";
  }

}
