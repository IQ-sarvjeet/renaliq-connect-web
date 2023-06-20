import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBIReportComponent } from './power-bi-report.component';

describe('PowerBIReportComponent', () => {
  let component: PowerBIReportComponent;
  let fixture: ComponentFixture<PowerBIReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBIReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerBIReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
