import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAndExpensesAnalyticsOverviewComponent } from './profit-and-expenses-analytics-overview.component';

describe('ProfitAndExpensesAnalyticsOverviewComponent', () => {
  let component: ProfitAndExpensesAnalyticsOverviewComponent;
  let fixture: ComponentFixture<ProfitAndExpensesAnalyticsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitAndExpensesAnalyticsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitAndExpensesAnalyticsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
