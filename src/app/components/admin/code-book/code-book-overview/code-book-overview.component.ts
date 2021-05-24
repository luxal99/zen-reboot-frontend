import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../../util/dialog-util';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {setDialogConfig} from '../../../../util/dialog-options';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {DefaultComponent} from '../../../../util/default-component';
import {GenericService} from '../../../../service/generic.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-book-overview',
  templateUrl: './code-book-overview.component.html',
  styleUrls: ['./code-book-overview.component.sass']
})
export class CodeBookOverviewComponent extends DefaultComponent<any> implements OnInit {

  @Input() header = '';
  @Input() displayNameValues: string[] = [];
  @Input() attrNameValues: string[] = [];
  @Input() configData!: FormBuilderConfig;

  constructor(protected genericService: GenericService<any>, private dialog: MatDialog, protected snackBar: MatSnackBar) {
    super(genericService, snackBar);
  }

  ngOnInit(): void {
    this.initService();
    super.ngOnInit();
  }

  initService(): void {
    this.genericService = this.configData.service;
  }

  openDialog(formData?: any): void {
    formData ? this.configData.formValues = formData : this.configData.formValues = null;
    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: this.configData
    }), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

}
