import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareMemberComponent } from './care-member.component';

describe('CareMemberComponent', () => {
  let component: CareMemberComponent;
  let fixture: ComponentFixture<CareMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
