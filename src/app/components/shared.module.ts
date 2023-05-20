import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarChartHorizontalComponent } from './bar-chart-horizontal/bar-chart-horizontal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ProgressBarChartWidgetComponent } from './progress-bar-chart-widget/progress-bar-chart-widget.component';
import { GridComponent } from './grid/grid.component';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { LoggerService } from '../shared/services/logger.service';
import { HttpClientWapperService } from '../shared/services/httpclient.wapper.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToasterComponent } from './toaster/toaster.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DataCardComponent } from './data-card/data-card.component';
import { NoRecordsFoundComponent } from './no-records-found/no-records-found.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
 imports:      [ CommonModule, HighchartsChartModule, ],
 declarations: [
    ProgressBarChartWidgetComponent,
    BarChartHorizontalComponent,
    DoughnutChartComponent,
    BarChartComponent,
    GridComponent,
    SearchComponent,
    PaginationComponent,
    SpinnerComponent,
    ToasterComponent,
    NotificationsComponent,
    DataCardComponent,
    NoRecordsFoundComponent,
    TypeaheadComponent
  ],

  providers: [
    LocalStorageService,
    LoggerService,
    HttpClientWapperService
  ],

 exports: [ 
    ProgressBarChartWidgetComponent,
    BarChartHorizontalComponent,
    DoughnutChartComponent,
    BarChartComponent,
    GridComponent,
    SearchComponent,
    PaginationComponent,
    SpinnerComponent,
    ToasterComponent,
    RouterModule,
    NotificationsComponent,
    DataCardComponent,
    NoRecordsFoundComponent,
    TypeaheadComponent
  ],
 
})
export class SharedModule { }
