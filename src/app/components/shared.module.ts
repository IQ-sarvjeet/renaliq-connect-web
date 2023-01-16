import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarChartWidgetComponent } from './progress-bar-chart-widget/progress-bar-chart-widget.component';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ ProgressBarChartWidgetComponent ],
 exports:      [ ProgressBarChartWidgetComponent ]
})
export class SharedModule { }