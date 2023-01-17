import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByStageComponent } from './patient-by-stage.component';

describe('PatientByStageComponent', () => {
  let component: PatientByStageComponent;
  let fixture: ComponentFixture<PatientByStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientByStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientByStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
