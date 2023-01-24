import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartHorizontalComponent } from './bar-chart-horizontal/bar-chart-horizontal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ProgressBarChartWidgetComponent } from './progress-bar-chart-widget/progress-bar-chart-widget.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [
    ProgressBarChartWidgetComponent,
    BarChartHorizontalComponent,
    DoughnutChartComponent,
    BarChartComponent,
    GridComponent
],
 exports: [ 
    ProgressBarChartWidgetComponent,
    BarChartHorizontalComponent,
    DoughnutChartComponent,
    BarChartComponent,
    GridComponent
 ]
})
export class SharedModule { }