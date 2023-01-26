import { Component } from '@angular/core';
import { ProgressBarChartWidgetInput } from 'src/app/interfaces/progress-bar-chart-widget';

@Component({
  selector: 'app-risk-stratification-analysis',
  templateUrl: './risk-stratification-analysis.component.html',
  styleUrls: ['./risk-stratification-analysis.component.scss']
})
export class RiskStratificationAnalysisComponent {
  patientByPayer: ProgressBarChartWidgetInput = {
    title: 'Patient By Payer & LOB',
    apiUrl: 'assets/mockData/patientByComorbidityChartData.json'
  }
  patientByRiskCategor: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'assets/mockData/patientByRiskCategoryChartData.json'
  }
}
