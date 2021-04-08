import {Component, ComponentRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GenericService} from '../service/generic.service';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogUtil} from './dialog-util';
import {ComponentType} from '@angular/cdk/portal';
import {SnackBarUtil} from './snack-bar-uitl';
import {Message} from '../const/const';

@Component({
  template: ''
})
export abstract class DefaultComponent<T> implements OnInit {
  protected spinnerService!: SpinnerService;
  @ViewChild('spinner') protected spinner!: MatSpinner;
  listOfItems: any[] = [];

  protected constructor(protected genericService: GenericService<T>, protected snackBar: MatSnackBar) {
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

  subscribeSave(entity: T): void {
    this.spinnerService.show(this.spinner);
    this.genericService.save(entity).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

  subscribeUpdate(entity: T): void {
    this.spinnerService.show(this.spinner);
    this.genericService.update(entity).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

  delete(): void {

  }

  ngOnInit(): void {
    this.getItems();
  }
}