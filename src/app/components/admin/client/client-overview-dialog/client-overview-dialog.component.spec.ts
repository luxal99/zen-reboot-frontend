import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOverviewDialogComponent } from './client-overview-dialog.component';

describe('ClientOverviewDialogComponent', () => {
  let component: ClientOverviewDialogComponent;
  let fixture: ComponentFixture<ClientOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOverviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
