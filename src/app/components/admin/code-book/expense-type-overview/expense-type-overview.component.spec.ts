import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeOverviewComponent } from './expense-type-overview.component';

describe('ExpenseTypeOverviewComponent', () => {
  let component: ExpenseTypeOverviewComponent;
  let fixture: ComponentFixture<ExpenseTypeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseTypeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
