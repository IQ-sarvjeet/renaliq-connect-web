import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureDefinitionsComponent } from './measure-definitions.component';

describe('MeasureDefinitionsComponent', () => {
  let component: MeasureDefinitionsComponent;
  let fixture: ComponentFixture<MeasureDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureDefinitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
