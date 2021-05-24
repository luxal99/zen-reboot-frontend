import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatusOverviewComponent } from './appointment-status-overview.component';

describe('AppointmentStatusOverviewComponent', () => {
  let component: AppointmentStatusOverviewComponent;
  let fixture: ComponentFixture<AppointmentStatusOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentStatusOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStatusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
