import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInsightComponent } from './patient-insight.component';

describe('PatientInsightComponent', () => {
  let component: PatientInsightComponent;
  let fixture: ComponentFixture<PatientInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInsightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
