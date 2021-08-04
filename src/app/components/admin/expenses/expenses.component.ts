import {Component, OnInit} from "@angular/core";
import {DefaultComponent} from "../../../util/default-component";
import {Expense} from "../../../models/entity/expense";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExpenseService} from "../../../service/expense.service";
import {FormBuilderConfig} from "../../../models/util/FormBuilderConfig";
import {FormControlNames, InputTypes} from "../../../const/const";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogUtil} from "../../../util/dialog-util";
import {FormBuilderComponent} from "../../form-components/form-builder/form-builder.component";
import {setDialogConfig} from "../../../util/dialog-options";
import {ExpenseTypeService} from "../../../service/expense-type.service";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {CriteriaBuilder} from "../../../util/criteria-builder";
import {LocationService} from "../../../service/location.service";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.sass"]
})
export class ExpensesComponent extends DefaultComponent<Expense> implements OnInit {

  numberOfPage = 0;
  query!: string;

  startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");
  displayedColumns: string[] = ["name", "date", "type", "value", "option"];

  expenseFilterForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  hasResponse = true;

  constructor(public expenseService: ExpenseService, protected snackBar: MatSnackBar,
              private expenseTypeService: ExpenseTypeService, private dialog: MatDialog,
              private locationService: LocationService) {
    super(expenseService, snackBar);
  }

  ngOnInit(): void {
    this.initDefaultQuery();
    this.getExpenses();
  }

  initDefaultQuery(): void {
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.gt("date", this.startOfMonth).and()
      .lt("date", this.endOfMonth);

    this.query = queryBuilder.buildUrlEncoded();

  }

  getExpenses(): void {
    this.expenseService.getAllExpensesWithPagination(this.numberOfPage, this.query).subscribe((resp) => {
      this.listOfItems = resp;
      this.spinnerService.hide(this.spinner);
      this.hasResponse = resp.length !== 0;
    });
  }

  async openAddExpenseDialog(data?: Expense): Promise<void> {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT_TYPE_NAME,
          validation: [Validators.required],
          label: "Naziv troška"
        },
        {
          name: FormControlNames.VALUE_FORM_CONTROL,
          type: InputTypes.INPUT_TYPE_NAME,
          validation: [Validators.required],
          icon: "plus_one",
          label: "Vrednost"
        },
        {
          name: FormControlNames.TYPE_FORM_CONTROL,
          type: InputTypes.SELECT_TYPE_NAME,
          validation: [Validators.required],
          label: "Tip troška",
          options: await this.expenseTypeService.getAll().toPromise()
        },
        {
          name: FormControlNames.LOCATION_FORM_CONTROL,
          type: InputTypes.SELECT_TYPE_NAME,
          validation: [Validators.required],
          label: "Lokacija",
          options: await this.locationService.getAll().toPromise()
        },
        {
          name: FormControlNames.DATE,
          type: InputTypes.DATE,
          validation: [Validators.required],
          label: "Datum valute",
          options: await this.expenseTypeService.getAll().toPromise()
        }
      ],
      formValues: data,
      headerText: "Dodaj trošak",
      service: this.expenseService
    };

    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig({
      position: {top: "6%"},
      width: "30%",
      data: configData
    }), this.dialog).afterClosed().subscribe(() => {
      this.getExpenses();
    });
  }

  getExpensesFromRange(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    this.query = queryBuilder.buildUrlEncoded();
    this.numberOfPage = 0;
    this.getExpenses();
  }

  getNext(): void {
    this.spinnerService.show(this.spinner);
    this.numberOfPage += 1;
    this.getExpenses();
  }

  getPrevious(): void {
    if (this.numberOfPage > 0) {
      this.spinnerService.show(this.spinner);
      this.numberOfPage -= 1;
      this.getExpenses();
    }
  }
}
