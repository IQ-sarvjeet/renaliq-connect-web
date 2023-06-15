import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBySomatusComponent } from './shared-by-somatus.component';

describe('SharedBySomatusComponent', () => {
  let component: SharedBySomatusComponent;
  let fixture: ComponentFixture<SharedBySomatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedBySomatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedBySomatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
