import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { QualityMatrixComponent } from './quality-matrix/quality-matrix.component';
import { PatientInsightComponent } from './patient-insight/patient-insight.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { ReportsGridComponent } from './reports-grid/reports-grid.component';
import { SharedModule } from 'src/app/components/shared.module';
import { RiskStratificationAnalysisComponent } from './risk-stratification-analysis/risk-stratification-analysis.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MapComponent } from './map/map.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';
import { MeasureDefinitionsComponent } from './quality-matrix/measure-definitions/measure-definitions.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
  {
    path: 'riskAnalysis',
    component: RiskAnalysisComponent,
  },
  {
    path: 'qualityMatrix',
    component: QualityMatrixComponent,
  },
  {
    path: 'insight',
    children: [
      {
        path: '',
        component: PatientInsightComponent,
      },
      {
        path: 'risk',
        component: RiskStratificationAnalysisComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ReportsComponent,
    QualityMatrixComponent,
    PatientInsightComponent,
    RiskAnalysisComponent,
    ReportsGridComponent,
    RiskStratificationAnalysisComponent,
    MapComponent,
    HeatmapsComponent,
    MeasureDefinitionsComponent,
  ],
  imports: [
    MbscModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    SharedModule],
})
export class ReportsModule {}
