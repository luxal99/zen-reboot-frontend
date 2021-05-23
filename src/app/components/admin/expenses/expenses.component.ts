import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Expense} from '../../../models/expense';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExpenseService} from '../../../service/expense.service';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import {Validators} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {setDialogConfig} from '../../../util/dialog-options';
import {ExpenseTypeService} from '../../../service/expense-type.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent extends DefaultComponent<Expense> implements OnInit {

  constructor(private expenseService: ExpenseService, protected snackBar: MatSnackBar,
              private expenseTypeService: ExpenseTypeService, private dialog: MatDialog) {
    super(expenseService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
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

}
