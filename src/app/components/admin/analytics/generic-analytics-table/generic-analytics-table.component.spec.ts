import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAnalyticsTableComponent } from './generic-analytics-table.component';

describe('GenericAnalyticsTableComponent', () => {
  let component: GenericAnalyticsTableComponent;
  let fixture: ComponentFixture<GenericAnalyticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericAnalyticsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAnalyticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
