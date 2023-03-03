import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFectorAuthComponent } from './two-fector-auth.component';

describe('TwoFectorAuthComponent', () => {
  let component: TwoFectorAuthComponent;
  let fixture: ComponentFixture<TwoFectorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFectorAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFectorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
