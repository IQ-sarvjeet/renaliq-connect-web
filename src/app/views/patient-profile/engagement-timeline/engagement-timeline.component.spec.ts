import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementTimelineComponent } from './engagement-timeline.component';

describe('EngagementTimelineComponent', () => {
  let component: EngagementTimelineComponent;
  let fixture: ComponentFixture<EngagementTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
