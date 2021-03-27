import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {ReferralSourceService} from '../../../service/referral-source.service';
import {ReferralSource} from '../../../models/referral-source';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../service/spinner.service';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {FormControlNames, InputTypes, Message} from '../../../const/const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfReferralSources: ReferralSource[] = [];

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService,
              private entry: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private referralSourceService: ReferralSourceService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllReferralSource();
  }

  getAllReferralSource(): void {
    this.referralSourceService.getAll().subscribe((resp) => {
      // @ts-ignore
      this.listOfReferralSources = resp.map((referralSource) => ({
        id: referralSource.id,
        value: referralSource.value,
        createdDate: new Date(referralSource.createdDate),
        lastModifiedDate: new Date(referralSource.lastModifiedDate)
      }));
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddReferralSourceDialog(referralSource: ReferralSource): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.VALUE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Dodaj razlog otkazivanja'
      }],
      headerText: 'Dodaj razlog otkazivanja',
      service: this.referralSourceService

    };
    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllReferralSource();
    });
  }

  deleteReferralSource(referralSource: ReferralSource): void {
    // @ts-ignore
    this.referralSourceService.delete(referralSource.id).subscribe(() => {
      this.getAllReferralSource();
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    });
  }
}
