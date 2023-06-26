import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBIComponent } from './PBI.component';

describe('PowerBIComponent', () => {
  let component: PBIComponent;
  let fixture: ComponentFixture<PBIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PBIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PBIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
