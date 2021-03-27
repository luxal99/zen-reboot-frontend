import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../../service/spinner.service';
import {TreatmentService} from '../../../service/treatment.service';
import {TreatmentCategoryService} from '../../../service/treatment-category.service';
import {TreatmentCategory} from '../../../models/treatment-category';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {

  listOfTreatmentCategory: TreatmentCategory[] = [];

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService,
              private treatmentService: TreatmentService, private treatmentCategoryService: TreatmentCategoryService) {
  }

  ngOnInit(): void {
  }

}
