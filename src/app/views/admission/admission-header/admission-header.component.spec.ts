import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionHeaderComponent } from './admission-header.component';

describe('AdmissionHeaderComponent', () => {
  let component: AdmissionHeaderComponent;
  let fixture: ComponentFixture<AdmissionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
