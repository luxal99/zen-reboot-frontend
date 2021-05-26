import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOverviewDialogComponent } from './package-overview-dialog.component';

describe('PackageOverviewDialogComponent', () => {
  let component: PackageOverviewDialogComponent;
  let fixture: ComponentFixture<PackageOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageOverviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
