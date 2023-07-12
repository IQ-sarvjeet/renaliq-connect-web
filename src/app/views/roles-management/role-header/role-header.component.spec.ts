import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHeaderComponent } from './role-header.component';

describe('RoleHeaderComponent', () => {
  let component: RoleHeaderComponent;
  let fixture: ComponentFixture<RoleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
