import {Component, ComponentRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../service/spinner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GenericService} from '../service/generic.service';
import {Observable} from 'rxjs';
import {SnackBarUtil} from './snack-bar-uitl';
import {Message} from '../const/const';
import {FieldConfig} from '../models/FIeldConfig';

@Component({
  template: ''
})
export abstract class DefaultComponent<T> implements OnInit {
  protected spinnerService!: SpinnerService;
  @ViewChild('spinner') protected spinner!: MatSpinner;
  listOfItems: T[] = [];

  protected constructor(protected genericService: GenericService<T>, protected snackBar: MatSnackBar) {
    this.spinnerService = new SpinnerService();
  }

  getItems(): void {
    this.genericService.getAll().subscribe((resp) => {
      this.listOfItems = resp;
      this.listOfItems.filter((x) => {
        // @ts-ignore
        if (x.createdDate) {
          // @ts-ignore
          x.createdDate = new Date(x.createdDate);
        }
      });
      setTimeout(() => {
        this.spinnerService.hide(this.spinner);
      }, 100);
    });
  }

  subscribeSave(entity: T, otherService?: GenericService<any>): void {
    this.spinnerService.show(this.spinner);
    if (otherService) {
      otherService.save(entity).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    } else {
      this.genericService.save(entity).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    }
  }


  otherSubscribe(subscriber: Observable<any>, service?: GenericService<any>): void {
    this.spinnerService.show(this.spinner);
    subscriber.subscribe(() => {
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

  // tslint:disable-next-line:ban-types
  subscribeDelete(id: number, otherService?: GenericService<any>, callBack?: Function): any {

    this.spinnerService.show(this.spinner);
    if (otherService) {
      otherService.delete(id).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
        if (callBack) {
          callBack();
        } else {
          this.getItems();
        }
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    } else {
      this.genericService.delete(id).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
        this.getItems();
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
        this.spinnerService.hide(this.spinner);
      });
    }
  }


  ngOnInit(): void {
    this.getItems();
  }

  initSelectConfig(service: GenericService<any>, locationSelectConfig: FieldConfig): void {
    service.getAll().subscribe((resp) => {
      locationSelectConfig.options = resp;
    });
  }

}
