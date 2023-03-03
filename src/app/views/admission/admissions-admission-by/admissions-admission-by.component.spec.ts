import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsAdmissionByComponent } from './admissions-admission-by.component';

describe('AdmissionsAdmissionByComponent', () => {
  let component: AdmissionsAdmissionByComponent;
  let fixture: ComponentFixture<AdmissionsAdmissionByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionsAdmissionByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionsAdmissionByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
