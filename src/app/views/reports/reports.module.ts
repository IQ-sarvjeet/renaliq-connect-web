import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { QualityMatrixComponent } from './quality-matrix/quality-matrix.component';
import { PatientInsightComponent } from './patient-insight/patient-insight.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { ReportsGridComponent } from './reports-grid/reports-grid.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
  {
    path: 'riskAnalysis',
    component: RiskAnalysisComponent
  },
  {
    path: 'qualityMatrix',
    component: QualityMatrixComponent
  },
  {
    path: 'insight',
    component: PatientInsightComponent
  }
];

@NgModule({
  declarations: [
    ReportsComponent,
    QualityMatrixComponent,
    PatientInsightComponent,
    RiskAnalysisComponent,
    ReportsGridComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ReportsModule { }
