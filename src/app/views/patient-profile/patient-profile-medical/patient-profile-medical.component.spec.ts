import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileMedicalComponent } from './patient-profile-medical.component';

describe('PatientProfileMedicalComponent', () => {
  let component: PatientProfileMedicalComponent;
  let fixture: ComponentFixture<PatientProfileMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileMedicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientProfileMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
