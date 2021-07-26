import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Expense} from '../../../models/expense';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExpenseService} from '../../../service/expense.service';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {setDialogConfig} from '../../../util/dialog-options';
import {ExpenseTypeService} from '../../../service/expense-type.service';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {CriteriaBuilder} from '../../../util/criteria-builder';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent extends DefaultComponent<Expense> implements OnInit {

  startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
  endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD');
  displayedColumns: string[] = ['name', 'date', 'type', 'value', 'option'];

  expenseFilterForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(private expenseService: ExpenseService, protected snackBar: MatSnackBar,
              private expenseTypeService: ExpenseTypeService, private dialog: MatDialog) {
    super(expenseService, snackBar);
  }

  ngOnInit(): void {
    super.getItems(new CriteriaBuilder().gt('createdDate', this.startOfMonth).and().lt('createdDate', this.endOfMonth).buildUrlEncoded());
  }

  async openAddExpenseDialog(data?: Expense): Promise<void> {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT_TYPE_NAME,
          validation: [Validators.required],
          label: 'Naziv troška'
        },
        {
          name: FormControlNames.VALUE_FORM_CONTROL,
          type: InputTypes.INPUT_TYPE_NAME,
          validation: [Validators.required],
          label: 'Vrednost'
        },
        {
          name: FormControlNames.TYPE_FORM_CONTROL,
          type: InputTypes.SELECT_TYPE_NAME,
          validation: [Validators.required],
          label: 'Tip troška',
          options: await this.expenseTypeService.getAll().toPromise()
        }
      ],
      formValues: data,
      headerText: 'Dodaj trošak',
      service: this.expenseService
    };

    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: configData
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  getExpensesFromRange(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.gt('createdDate',
      moment(this.expenseFilterForm.get(FormControlNames.START_DATE_FORM_CONTROL)?.value).format('YYYY-MM-DD')).and()
      .lt('createdDate', moment(this.expenseFilterForm.get(FormControlNames.END_DATE_FORM_CONTROL)?.value).format('YYYY-MM-DD'));
    console.log(queryBuilder.build());
    super.getItems(queryBuilder.buildUrlEncoded());
  }
}
