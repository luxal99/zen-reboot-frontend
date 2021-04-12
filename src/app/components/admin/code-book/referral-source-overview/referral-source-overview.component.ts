import {Component, OnInit, ViewChild} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {ReferralSource} from '../../../../models/referral-source';
import {ReferralSourceService} from '../../../../service/referral-source.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Validators} from '@angular/forms';
import {DialogUtil} from '../../../../util/dialog-util';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-referral-source-overview',
  templateUrl: './referral-source-overview.component.html',
  styleUrls: ['./referral-source-overview.component.sass']
})
export class ReferralSourceOverviewComponent extends DefaultComponent<ReferralSource> implements OnInit {

  constructor(private referralSourceService: ReferralSourceService,
              protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super(referralSourceService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  
  openAddReferralSourceDialog(referralSource?: ReferralSource): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.VALUE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: 'Dodaj razlog otkazivanja'
      }],
      formValues: referralSource,
      headerText: 'Dodaj razlog otkazivanja',
      service: this.referralSourceService

    };
    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  deleteReferralSource(id: number): void {
    super.subscribeDelete(id);

  }
}
