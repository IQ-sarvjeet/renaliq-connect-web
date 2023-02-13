import { Component } from '@angular/core';
import { ProgressBarChartWidgetInput } from 'src/app/interfaces/progress-bar-chart-widget';
import { DataCardInput } from './summary-interfaces/data-card';
import { DescriptionCardInput } from './summary-interfaces/description-card';

declare const $: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  patients: DataCardInput = {
    iconClass: 'icon-user',
    cardTitle: 'Attributed Patients',
    value: '253',
    percentile: 10,
    performance: 'up',
  };
  admissions: DataCardInput = {
    iconClass: 'icon-target',
    cardTitle: 'Admissions',
    value: '253',
    percentile: 10,
    performance: 'down',
  };
  engagedPatients: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: 'Engaged Patients',
    value: '100',
    percentile: 10,
    performance: 'up',
  };
  admissionRecent: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: 'Admission',
    value: '5',
    percentile: 12,
    performance: 'up',
  };
  patientInsight: DescriptionCardInput = {
    redirectTo: '/reports/insight',
    iconClass: 'icon-eye',
    cardTitle: 'Patient Insight',
    description:
      'Insight of your patient popullation, including trend & performance comparision.',
  };
  qualityMatrics: DescriptionCardInput = {
    redirectTo: '/reports/qualityMatrix',
    iconClass: 'icon-briefcase',
    cardTitle: 'Clinical Quality Matrics',
    description: 'Practice current performance on clinical quality matics',
  };
  riskStratification: DescriptionCardInput = {
    redirectTo: '/reports/riskAnalysis',
    iconClass: 'icon-people',
    cardTitle: 'Risk Stratification',
    description:
      'Insight of Patient Risk Stratification for the patient associated with Somatus',
  };
  patientByRiskCategor: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'Patient/summary/riskcategory',
  };
  patientByComorbidity: ProgressBarChartWidgetInput = {
    title: 'Patient By Chronic Conditions',
    apiUrl: 'Patient/summary/chronicconditions',
  };
  patientByAgeGroup: ProgressBarChartWidgetInput = {
    title: 'Patient By Age Group',
    apiUrl: 'Patient/summary/age',
  };
}
