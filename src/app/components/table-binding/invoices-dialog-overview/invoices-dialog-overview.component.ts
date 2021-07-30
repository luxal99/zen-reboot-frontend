import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Invoice} from "../../../models/entity/invoice";
import * as moment from "moment";

@Component({
  selector: "app-invoices-dialog-overview",
  templateUrl: "./invoices-dialog-overview.component.html",
  styleUrls: ["./invoices-dialog-overview.component.sass"]
})
export class InvoicesDialogOverviewComponent implements OnInit {

  date = moment(this.data.date).format("DD MMMM YYYY");

  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) {
  }

  ngOnInit(): void {
    this.formatAppointmentDate();
  }

  formatAppointmentDate(): void {
    this.data.items?.forEach((item) => item.date = moment(item.date).format("DD MMMM YYYY"));
  }
}
