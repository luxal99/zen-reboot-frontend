import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoucherDialogComponent } from './add-voucher-dialog.component';

describe('AddVoucherDialogComponent', () => {
  let component: AddVoucherDialogComponent;
  let fixture: ComponentFixture<AddVoucherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVoucherDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
