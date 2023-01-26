import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskStratificationAnalysisComponent } from './risk-stratification-analysis.component';

describe('RiskStratificationAnalysisComponent', () => {
  let component: RiskStratificationAnalysisComponent;
  let fixture: ComponentFixture<RiskStratificationAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskStratificationAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskStratificationAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
