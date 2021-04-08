import {Component, ComponentRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GenericService} from '../service/generic.service';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogUtil} from './dialog-util';
import {ComponentType} from '@angular/cdk/portal';

@Component({
  template: ''
})
export abstract class DefaultComponent<T> implements OnInit {
  protected spinnerService!: SpinnerService;
  @ViewChild('spinner') protected spinner!: MatSpinner;
  listOfItems: any[] = [];

  protected constructor(protected genericService: GenericService<T>) {
    this.spinnerService = new SpinnerService();
  }

  getItems(): void {
    this.genericService.getAll().subscribe((resp) => {
      this.listOfItems = resp;
      setTimeout(() => {
        this.spinnerService.hide(this.spinner);
      }, 100);
    });
  }

  save(): void {
  }

  delete(): void {

  }

  ngOnInit(): void {
    this.getItems();
  }
}
