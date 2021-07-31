import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPaymentDialogComponent } from './extra-payment-dialog.component';

describe('ExtraPaymentDialogComponent', () => {
  let component: ExtraPaymentDialogComponent;
  let fixture: ComponentFixture<ExtraPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
