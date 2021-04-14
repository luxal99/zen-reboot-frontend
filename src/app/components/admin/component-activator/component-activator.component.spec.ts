import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentActivatorComponent } from './component-activator.component';

describe('ComponentActivatorComponent', () => {
  let component: ComponentActivatorComponent;
  let fixture: ComponentFixture<ComponentActivatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentActivatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentActivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
