import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarChartWidgetComponent } from './progress-bar-chart-widget.component';

describe('ProgressBarChartWidgetComponent', () => {
  let component: ProgressBarChartWidgetComponent;
  let fixture: ComponentFixture<ProgressBarChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarChartWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
