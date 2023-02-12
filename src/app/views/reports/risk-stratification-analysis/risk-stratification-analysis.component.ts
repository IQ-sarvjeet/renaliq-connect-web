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
    apiUrl: 'Patient/summary/payer'
  }
  patientByRiskCategor: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'Patient/summary/riskcategory'
  }
}
