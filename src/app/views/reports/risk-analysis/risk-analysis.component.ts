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
    apiUrl: 'Patient/summary/stage',
  };
  patientByPayerLOB: ProgressBarChartWidgetInput = {
    title: 'Patient By Lob',
    apiUrl: 'Patient/summary/lob',
  };
  patientByRiskCategory: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'Patient/summary/riskcategory',
  };
}
