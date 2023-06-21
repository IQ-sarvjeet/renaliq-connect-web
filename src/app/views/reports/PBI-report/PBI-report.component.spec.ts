import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBIReportComponent } from './PBI-report.component';

describe('PowerBIReportComponent', () => {
  let component: PBIReportComponent;
  let fixture: ComponentFixture<PBIReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PBIReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PBIReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
