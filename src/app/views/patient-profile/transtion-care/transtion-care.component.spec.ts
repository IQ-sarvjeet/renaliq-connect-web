import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranstionCareComponent } from './transtion-care.component';

describe('TranstionCareComponent', () => {
  let component: TranstionCareComponent;
  let fixture: ComponentFixture<TranstionCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranstionCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranstionCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
