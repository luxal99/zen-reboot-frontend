import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDialogOverviewComponent } from './invoices-dialog-overview.component';

describe('InvoicesDialogOverviewComponent', () => {
  let component: InvoicesDialogOverviewComponent;
  let fixture: ComponentFixture<InvoicesDialogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesDialogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
