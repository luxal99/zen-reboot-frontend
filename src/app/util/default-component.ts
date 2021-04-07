import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GenericService} from '../service/generic.service';

@Component({
  template: ''
})
export abstract class DefaultComponent {
  protected spinnerService!: SpinnerService;
  @ViewChild('spinner') protected spinner!: MatSpinner;
  protected snackBar!: MatSnackBar;
  listOfItems: any[] = [];

  protected constructor(protected genericService: GenericService<any>) {
    this.spinnerService = new SpinnerService();
  }

  getItems(): void {
    this.genericService.getAll().subscribe((resp) => {
      this.listOfItems = resp;
      this.spinnerService.hide(this.spinner);
    });
  }
}
