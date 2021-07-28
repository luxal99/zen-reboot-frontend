import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {MatTab} from "@angular/material/tabs";
import {FormBuilderConfig} from "../../../models/util/FormBuilderConfig";
import {FormControlNames, InputTypes} from "../../../const/const";
import {Validators} from "@angular/forms";
import {ReferralSourceService} from "../../../service/referral-source.service";
import {AppointmentStatusService} from "../../../service/appointment-status.service";
import {LazyLoadComponentsUtil} from "../../../util/lazy-loading-components";
import {CodeBookOverviewComponent} from "./code-book-overview/code-book-overview.component";
import {GenericService} from "../../../service/generic.service";
import {ExpenseTypeService} from "../../../service/expense-type.service";
import {LocationOverviewComponent} from "./location-overview/location-overview.component";
import {CityService} from "../../../service/city.service";
import {CountryService} from "../../../service/country.service";
import {SalaryCategoryService} from "../../../service/salary-category.service";

@Component({
  selector: "app-code-book",
  templateUrl: "./code-book.component.html",
  styleUrls: ["./code-book.component.sass"]
})
export class CodeBookComponent implements OnInit {

  @ViewChild("countriesAndCitiesTab") countriesAndCitiesTab!: MatTab;
  @ViewChild("locationTab") locationTab!: MatTab;
  @ViewChild("appointmentStatusTab") appointmentStatusTab!: MatTab;
  @ViewChild("expenseTypeTab") expenseTypeTab!: MatTab;
  @ViewChild("salaryCategoryTab") salaryCategoryTab!: MatTab;

  @ViewChild("appointmentStatusOverview", {
    read: ViewContainerRef,
    static: false
  }) appointmentStatusOverview!: ViewContainerRef;
  @ViewChild("expenseTypeOverview", {read: ViewContainerRef, static: false}) expenseTypeOverview!: ViewContainerRef;
  @ViewChild("locationOverview", {read: ViewContainerRef, static: false}) locationOverview!: ViewContainerRef;
  @ViewChild("citiesOverview", {read: ViewContainerRef, static: false}) citiesOverview!: ViewContainerRef;
  @ViewChild("countriesOverview", {read: ViewContainerRef, static: false}) countriesOverview!: ViewContainerRef;
  @ViewChild("salaryCategoryOverview", {
    read: ViewContainerRef,
    static: false
  }) salaryCategoryOverview!: ViewContainerRef;

  referralSourceConfig: FormBuilderConfig = {
    formFields: [{
      name: FormControlNames.VALUE_FORM_CONTROL,
      type: InputTypes.INPUT_TYPE_NAME,
      validation: [Validators.required],
      label: "Dodaj način dolaska"
    }],
    headerText: "Dodaj način dolaska",
    service: this.referralSourceService

  };
  appointmentStatusConfig: FormBuilderConfig = {
    formFields: [{
      name: FormControlNames.VALUE_FORM_CONTROL,
      type: InputTypes.INPUT_TYPE_NAME,
      validation: [Validators.required],
      label: "Dodaj status tretmana"
    }],
    headerText: "Dodaj status tretmana",
    service: this.appointmentStatusService
  };

  expenseTypeConfig: FormBuilderConfig = {
    formFields: [{
      name: FormControlNames.NAME_FORM_CONTROL,
      type: InputTypes.INPUT_TYPE_NAME,
      validation: [Validators.required],
      label: "Tip troška"
    }],
    headerText: "Dodaj tip troška",
    service: this.expenseTypeService
  };
  salaryCategoryConfig: FormBuilderConfig = {
    formFields: [{
      name: FormControlNames.NAME_FORM_CONTROL,
      type: InputTypes.INPUT_TYPE_NAME,
      validation: [Validators.required],
      label: "Tip troška"
    },
      {
        name: FormControlNames.PERCENTAGE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: "Procenat"
      }],
    headerText: "Dodaj tip kategoriju plaćanja",
    service: this.salaryCategoryService
  };

  countryConfig: FormBuilderConfig = {
    formFields: [
      {
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: "Naziv države"
      },
      {
        name: FormControlNames.DIAL_CODE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: "Pozivni broj"
      }
    ],
    headerText: "Dodaj državu",
    service: this.countryService
  };

  cityConfig: FormBuilderConfig = {
    formFields: [
      {
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: "Naziv grada"
      },
      {
        name: FormControlNames.ZIP_CODE_FORM_CONTROL,
        type: InputTypes.INPUT_TYPE_NAME,
        validation: [Validators.required],
        label: "Poštanski broj"
      },
      {
        name: FormControlNames.COUNTRY_FORM_CONTROL,
        type: InputTypes.SELECT_TYPE_NAME,
        validation: [Validators.required],
        label: "Država"
      }
    ],
    headerText: "Dodaj grad",
    service: this.cityService
  };


  constructor(private resolver: ComponentFactoryResolver, public referralSourceService: ReferralSourceService,
              private cityService: CityService, private countryService: CountryService,
              private salaryCategoryService: SalaryCategoryService,
              public appointmentStatusService: AppointmentStatusService, private expenseTypeService: ExpenseTypeService) {
  }

  async ngOnInit(): Promise<void> {
    this.cityConfig.formFields[2].options = await this.countryService.getAll().toPromise();
  }


  loadActivatedComponent(): void {
    setTimeout(async () => {
      if (this.countriesAndCitiesTab.isActive) {
        const countryComponent = LazyLoadComponentsUtil.loadComponent(CodeBookOverviewComponent,
          this.countriesOverview, this.resolver);

        this.setCodeBookOverviewData(countryComponent, "Države",
          ["Naziv", "Datum kreiranja"], ["name", "createdDate"], this.countryConfig);

        const cityComponent = LazyLoadComponentsUtil.loadComponent(CodeBookOverviewComponent,
          this.citiesOverview, this.resolver);

        this.setCodeBookOverviewData(cityComponent, "Gradovi",
          ["Naziv", "Datum kreiranja"], ["name", "createdDate"], this.cityConfig);
      } else if (this.locationTab.isActive) {
        LazyLoadComponentsUtil.loadComponent(LocationOverviewComponent, this.locationOverview, this.resolver);
      } else if (this.appointmentStatusTab.isActive) {
        const component = LazyLoadComponentsUtil.loadComponent(CodeBookOverviewComponent,
          this.appointmentStatusOverview, this.resolver);

        this.setCodeBookOverviewData(component, "Statusi tretmana",
          ["Naziv", "Datum kreiranja"], ["value", "createdDate"], this.appointmentStatusConfig);
      } else if (this.expenseTypeTab.isActive) {
        const component = LazyLoadComponentsUtil.loadComponent(CodeBookOverviewComponent,
          this.expenseTypeOverview, this.resolver);

        this.setCodeBookOverviewData(component, "Tipovi troškova",
          ["Naziv", "Datum kreiranja"], ["name", "createdDate"], this.expenseTypeConfig);
      } else if (this.salaryCategoryTab.isActive) {
        const component = LazyLoadComponentsUtil.loadComponent(CodeBookOverviewComponent, this.salaryCategoryOverview, this.resolver);
        this.setCodeBookOverviewData(component, "Kategorije plaćanja",
          ["Naziv", "Procenat", "Datum kreiranja"],
          ["name", "percentage", "createdDate"],
          this.salaryCategoryConfig);
      }
    }, 250);
  }

  setCodeBookOverviewData(component: ComponentRef<any>, header: string,
                          displayNameValues: string[], attrNameValues: string[], dialogConfig: FormBuilderConfig): void {
    component.instance.header = header;
    component.instance.displayNameValues = displayNameValues;
    component.instance.attrNameValues = attrNameValues;
    component.instance.configData = dialogConfig;
  }

}
