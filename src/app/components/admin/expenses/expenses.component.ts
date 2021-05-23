import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Expense} from '../../../models/expense';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExpenseService} from '../../../service/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent extends DefaultComponent<Expense> implements OnInit {

  constructor(private expenseService: ExpenseService, protected snackBar: MatSnackBar) {
    super(expenseService, snackBar);
  }

  ngOnInit(): void {
  }

}
