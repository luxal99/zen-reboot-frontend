import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreatmentCategoryDialogComponent } from './add-treatment-category-dialog.component';

describe('AddTreatmentCategoryDialogComponent', () => {
  let component: AddTreatmentCategoryDialogComponent;
  let fixture: ComponentFixture<AddTreatmentCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTreatmentCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreatmentCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
