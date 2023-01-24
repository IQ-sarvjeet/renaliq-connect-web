import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsGridComponent } from './admissions-grid.component';

describe('AdmissionsGridComponent', () => {
  let component: AdmissionsGridComponent;
  let fixture: ComponentFixture<AdmissionsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
