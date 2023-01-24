import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileNavComponent } from './patient-profile-nav.component';

describe('PatientProfileNavComponent', () => {
  let component: PatientProfileNavComponent;
  let fixture: ComponentFixture<PatientProfileNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
