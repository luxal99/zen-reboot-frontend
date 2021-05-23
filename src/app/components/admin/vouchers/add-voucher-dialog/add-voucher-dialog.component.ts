import {Component, Inject, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Voucher} from '../../../../models/voucher';
import {VoucherService} from '../../../../service/voucher.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VoucherDto} from '../../../../models/voucher-dto';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, SELECTED_CLASS_NAME} from '../../../../const/const';
import {PaymentMethodService} from '../../../../service/payment-method.service';
import {ClientService} from '../../../../service/client.service';
import {Client} from '../../../../models/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {VoucherEnum} from '../../../../enums/VoucherEnum';
import {TreatmentService} from '../../../../service/treatment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.sass']
})
export class AddVoucherDialogComponent extends DefaultComponent<VoucherDto> implements OnInit {

  selectedClient!: Client;
  searchText = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  numberOfPage = 0;

  isCountDisabled = false;
  isDiscountDisabled = false;

  listOfClients: Client[] = [];
  voucherForm = new FormGroup({
    client: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    count: new FormControl(''),
    discount: new FormControl(''),
    treatment: new FormControl(''),
    treatmentDuration: new FormControl(''),
    paymentMethod: new FormControl('', Validators.required),
    startDate: new FormControl(this.data ? this.data.startDate : moment(new Date()).format('YYYY-MM-DD'))
  });

  countInputConfig: FieldConfig = {name: FormControlNames.COUNT_FORM_CONTROL, type: InputTypes.NUMBER};
  discountInputConfig: FieldConfig = {name: FormControlNames.DISCOUNT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  paymentMethodSelectConfig: FieldConfig = {name: FormControlNames.PAYMENT_METHOD_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};
  treatmentSelectConfig: FieldConfig = {name: FormControlNames.TREATMENT_FORM_CONTROL, type: InputTypes.INPUT_TYPE_NAME};
  durationSelectConfig: FieldConfig = {name: FormControlNames.DURATION_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME};

  typeSelectConfig: FieldConfig = {
    name: FormControlNames.TYPE_FORM_CONTROL, type: InputTypes.SELECT_TYPE_NAME, options: [VoucherEnum.BLANCO, VoucherEnum.PRODUCT]
  };
  isDurationFCDisabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voucher, private voucherService: VoucherService,
              private treatmentService: TreatmentService,
              protected snackBar: MatSnackBar, private clientService: ClientService) {
    super(voucherService, snackBar);
  }

  ngOnInit(): void {
    this.initSelect();
    this.getClient();
  }

  disableByVoucherType(): void {
    const voucherType = this.voucherForm.get(FormControlNames.TYPE_FORM_CONTROL)?.value;

    if (voucherType === VoucherEnum.PRODUCT.toString()) {
      this.isDiscountDisabled = true;
      this.isCountDisabled = false;
    } else if (voucherType === VoucherEnum.BLANCO.toString()) {
      this.isDiscountDisabled = false;
      this.isCountDisabled = true;
    } else {
      this.isDiscountDisabled = false;
      this.isCountDisabled = false;
    }
  }

  initSelect(): void {
    super.initSelectConfigWithObservable(this.voucherService.getVoucherPaymentMethod(), this.paymentMethodSelectConfig);
    super.initSelectConfig(this.treatmentService, this.treatmentSelectConfig);
  }

  selectClient(client: Client, $event: any): void {

    const element: HTMLElement = $event.target;
    const otherSelectedElements = document.querySelectorAll('.selected');
    [].forEach.call(otherSelectedElements, (el: any) => {
      el.classList.remove('selected');
    });
    if (element.classList.contains(SELECTED_CLASS_NAME)) {
      // @ts-ignore
      this.selectedClient = null;
      element.classList.remove(SELECTED_CLASS_NAME);
    } else {
      element.classList.add(SELECTED_CLASS_NAME);
      this.selectedClient = client;
    }
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

  onTreatmentSelect(): void {
    this.durationSelectConfig.options = [];
    this.durationSelectConfig.options = this.voucherForm.get(FormControlNames.TREATMENT_FORM_CONTROL)?.value.durations;
    this.isDurationFCDisabled = false;
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

  save(): void {
    const voucher: VoucherDto = this.voucherForm.getRawValue();
    voucher.client = {id: this.selectedClient.id};
    voucher.paymentMethod = {id: voucher.paymentMethod?.id};
    voucher.treatmentDuration = {id: voucher.treatmentDuration?.id};
    // @ts-ignore
    delete voucher.treatment;
    super.subscribeSave(voucher);
  }
}
