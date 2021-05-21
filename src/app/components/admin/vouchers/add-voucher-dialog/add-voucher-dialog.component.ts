import {Component, Inject, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Voucher} from '../../../../models/voucher';
import {VoucherService} from '../../../../service/voucher.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VoucherDto} from '../../../../models/voucher-dto';
import {PaymentMethod} from '../../../../models/payment-method';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {PaymentMethodService} from '../../../../service/payment-method.service';
import {ClientService} from '../../../../service/client.service';
import {Client} from '../../../../models/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.sass']
})
export class AddVoucherDialogComponent extends DefaultComponent<VoucherDto> implements OnInit {

  searchText = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  numberOfPage = 0;

  listOfClients: Client[] = [];
  voucherForm = new FormGroup({
    client: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    count: new FormControl(),
    discount: new FormControl(),
    paymentMethod: new FormControl('', Validators.required),
    startDate: new FormControl(this.data ? this.data.startDate : new Date())
  });

  countInputConfig: FieldConfig = {name: FormControlNames.COUNT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  discountInputConfig: FieldConfig = {name: FormControlNames.DISCOUNT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  paymentMethodSelectConfig: FieldConfig = {name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher, private voucherService: VoucherService,
              protected snackBar: MatSnackBar, private paymentService: PaymentMethodService, private clientService: ClientService) {
    super(voucherService, snackBar);
  }

  ngOnInit(): void {
    this.initSelect();
    this.getClient();
  }

  initSelect(): void {
    super.initSelectConfig(this.paymentService, this.paymentMethodSelectConfig);
  }

  save(): void {

  }

  getClient(): void {
    this.clientService.getPaginationClients(++this.numberOfPage).subscribe((resp) => {
      this.listOfClients = resp;
    });
  }

  getNext(): void {

    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(++this.numberOfPage).subscribe((clients) => {
      this.listOfClients = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  getPrevious(): void {
    if (this.numberOfPage !== 0) {
      this.spinnerService.show(this.spinner);
      this.clientService.getPaginationClients(--this.numberOfPage).subscribe((clients) => {
        this.listOfClients = clients;
        this.spinnerService.hide(this.spinner);
      });
    }
  }

  getCurrentPage(): void {
    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(this.numberOfPage).subscribe((clients) => {
      this.listOfClients = clients;
      this.spinnerService.hide(this.spinner);
    });
  }


  search(): void {
    const queryBuilder = new CriteriaBuilder();
    const search: string = this.searchForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value;
    queryBuilder.startsWith('person.firstName', search).or()
      .startsWith('person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    if (search.length > 3) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .subscribe((resp) => {
          this.listOfClients = resp;
        });
    } else if (search.length === 0) {
      this.getCurrentPage();
    }
  }
}
