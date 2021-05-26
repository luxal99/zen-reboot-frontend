import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Package} from '../../../../models/package';
import {PackageService} from '../../../../service/package.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../../models/client';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, SELECTED_CLASS_NAME} from '../../../../const/const';
import {VoucherEnum} from '../../../../enums/VoucherEnum';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {ClientService} from '../../../../service/client.service';

@Component({
  selector: 'app-add-package-dialog',
  templateUrl: './add-package-dialog.component.html',
  styleUrls: ['./add-package-dialog.component.sass']
})
export class AddPackageDialogComponent extends DefaultComponent<Package> implements OnInit {

  selectedClient: Client = {};

  searchForm = new FormGroup({
    search: new FormControl('')
  });
  numberOfPage = 0;

  isCountDisabled = false;
  isDiscountDisabled = false;

  listOfClients: Client[] = [];

  packageForm = new FormGroup({
    count: new FormControl('', Validators.required),
    discount: new FormControl(''),
    location: new FormControl(''),
    startDate: new FormControl(new Date(), Validators.required),
    treatmentDuration: new FormControl('', Validators.required)
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

  constructor(private packageService: PackageService, protected snackBar: MatSnackBar,
              private clientService: ClientService) {
    super(packageService, snackBar);
  }

  ngOnInit(): void {
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
    this.durationSelectConfig.options = this.packageForm.get(FormControlNames.TREATMENT_FORM_CONTROL)?.value.durations;
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

  }

}
