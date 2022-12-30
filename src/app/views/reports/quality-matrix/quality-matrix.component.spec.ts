import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMatrixComponent } from './quality-matrix.component';

describe('QualityMatrixComponent', () => {
  let component: QualityMatrixComponent;
  let fixture: ComponentFixture<QualityMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
