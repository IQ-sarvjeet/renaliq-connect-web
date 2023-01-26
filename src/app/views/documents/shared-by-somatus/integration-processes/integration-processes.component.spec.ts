import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationProcessesComponent } from './integration-processes.component';

describe('IntegrationProcessesComponent', () => {
  let component: IntegrationProcessesComponent;
  let fixture: ComponentFixture<IntegrationProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationProcessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
