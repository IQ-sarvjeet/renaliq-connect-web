import { Component } from '@angular/core';
import { ProgressBarChartWidgetInput } from '../../../../../src/app/interfaces/progress-bar-chart-widget';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss'],
})
export class RiskAnalysisComponent {
  patientByStage: ProgressBarChartWidgetInput = {
    title: 'Patient by Stage',
    apiUrl: 'assets/mockData/patientByRiskCategoryChartData.json',
  };
  patientByPayerLOB: ProgressBarChartWidgetInput = {
    title: 'Patient By Payer & LOB',
    apiUrl: 'assets/mockData/patientByPayerLOBChartData.json',
  };
  patientByRiskCategory: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'assets/mockData/patientByRiskCategoryChartData.json',
  };
}
