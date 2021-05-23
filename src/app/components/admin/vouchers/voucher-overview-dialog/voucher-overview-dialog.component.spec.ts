import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherOverviewDialogComponent } from './voucher-overview-dialog.component';

describe('VoucherOverviewDialogComponent', () => {
  let component: VoucherOverviewDialogComponent;
  let fixture: ComponentFixture<VoucherOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherOverviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
