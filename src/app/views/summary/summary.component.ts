import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { DataCardInput } from 'src/app/interfaces/data-card';
import { ProgressBarChartWidgetInput } from 'src/app/interfaces/progress-bar-chart-widget';
import { Messages } from 'src/app/shared/common-constants/messages';
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
    cardTitle: Messages.attributed,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissions: DataCardInput = {
    iconClass: 'fa-target',
    cardTitle: Messages.admissions,
    count: '-',
    percentile: null,
    performance: 'down',
  };
  engagedPatients: DataCardInput = {
    iconClass: 'fa-people',
    cardTitle: Messages.engagedPatients,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissionRecent: DataCardInput = {
    iconClass: 'fa-people',
    cardTitle: Messages.admissions7Days,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  patientInsight: DescriptionCardInput = {
    redirectTo: '/reports/insight',
    iconClass: 'fa-eye',
    cardTitle: Messages.patientInsight,
    description: Messages.patientPopullation,
  };
  qualityMatrics: DescriptionCardInput = {
    redirectTo: '/reports/qualityMatrix',
    iconClass: 'fa-briefcase',
    cardTitle: Messages.clinicalText1,
    description: Messages.practiceCurrentPerformance,
  };
  riskStratification: DescriptionCardInput = {
    redirectTo: '/reports/riskAnalysis',
    iconClass: 'fa-people',
    cardTitle: Messages.riskText1,
    description: Messages.patientInsightText2,
  };
  patientByRiskCategor: ProgressBarChartWidgetInput = {
    title: Messages.riskText2,
    apiUrl: 'Patient/summary/riskcategory',
  };
  patientByComorbidity: ProgressBarChartWidgetInput = {
    title: Messages.patientText1,
    apiUrl: 'Patient/summary/chronicconditions',
  };
  patientByAgeGroup: ProgressBarChartWidgetInput = {
    title: Messages.patientText2,
    apiUrl: 'Patient/summary/age',
  };
  constructor(private _patientService: PatientService) {}
  ngOnInit() {
    this._patientService.apiPatientCountGet().subscribe((response: any) => {
      this.admissions = {
        ...this.admissions,
        ...response.totalAdmission,
      };
      this.patients = {
        ...this.patients,
        ...response.totalPatient,
      };
      this.engagedPatients = {
        ...this.engagedPatients,
        ...response.totalEngagedPatient,
      };
      this.admissionRecent = {
        ...this.admissionRecent,
        ...response.totalRecentAdmission,
      };
    });
  }
}
