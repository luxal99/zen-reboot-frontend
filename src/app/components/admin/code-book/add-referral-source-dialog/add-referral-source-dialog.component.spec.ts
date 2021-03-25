import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferralSourceDialogComponent } from './add-referral-source-dialog.component';

describe('AddReferralSourceDialogComponent', () => {
  let component: AddReferralSourceDialogComponent;
  let fixture: ComponentFixture<AddReferralSourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReferralSourceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferralSourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
