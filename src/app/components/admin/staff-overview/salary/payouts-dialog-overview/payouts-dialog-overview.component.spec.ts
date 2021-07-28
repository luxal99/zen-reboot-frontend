import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsDialogOverviewComponent } from './payouts-dialog-overview.component';

describe('PayoutsDialogOverviewComponent', () => {
  let component: PayoutsDialogOverviewComponent;
  let fixture: ComponentFixture<PayoutsDialogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutsDialogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutsDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
