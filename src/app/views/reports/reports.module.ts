import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { QualityMatrixComponent } from './quality-matrix/quality-matrix.component';
import { PatientInsightComponent } from './patient-insight/patient-insight.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'riskAnalysis',
        component: RiskAnalysisComponent
      },
      {
        path: 'qualityMatrix',
        component: QualityMatrixComponent
      },
      {
        path: 'patientInsight',
        component: PatientInsightComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ReportsComponent,
    QualityMatrixComponent,
    PatientInsightComponent,
    RiskAnalysisComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ReportsModule { }
