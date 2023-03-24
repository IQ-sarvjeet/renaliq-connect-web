import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { DataCardInput } from 'src/app/interfaces/data-card';
import { Messages } from 'src/app/shared/common-constants/messages';
import { ProgressBarChartWidgetInput } from '../../../../../src/app/interfaces/progress-bar-chart-widget';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss'],
})
export class RiskAnalysisComponent {
  patientByStage: ProgressBarChartWidgetInput = {
    title: 'Patient by Stage',
    apiUrl: 'Patient/summary/stage/BAR',
  };
  patientByLOB: ProgressBarChartWidgetInput = {
    title: 'Patient By Lob',
    apiUrl: 'Patient/summary/lob',
  };
  patientByPayer: ProgressBarChartWidgetInput = {
    title: 'Patient By Payer',
    apiUrl: 'Patient/summary/payer',
  };
  patientByRiskCategory: ProgressBarChartWidgetInput = {
    title: 'Patient By Risk Category',
    apiUrl: 'Patient/summary/riskcategory',
  };
  patients: DataCardInput = {
    iconClass: 'icon-user',
    cardTitle: Messages.attributed,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissions: DataCardInput = {
    iconClass: 'icon-target',
    cardTitle: Messages.admissions,
    count: '-',
    percentile: null,
    performance: 'down',
  };
  engagedPatients: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: Messages.engagedPatients,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissionRecent: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: Messages.admissions7Days,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  tempdata1: DataCardInput = {
    iconClass: 'icon-target',
    cardTitle: '',
    count: '-',
    percentile: null,
    performance: 'down',
  };
  tempdata2: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: '',
    count: '-',
    percentile: null,
    performance: 'up',
  };
  patientByStageKeys: any = [];
  patientByRiskCategoryKeys: any = [];
  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.patientService.apiPatientCountGet().subscribe((response: any) => {
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
    this.patientService.apiPatientSummaryStageGet().subscribe({
      next: (stageData: any) => {
        this.patientByStageKeys = Object.keys(stageData);
      }
    })
    this.patientService.apiPatientSummaryRiskcategoryGet().subscribe({
      next: (stageData: any) => {
        stageData.forEach((item: any) => {
          this.patientByRiskCategoryKeys.push(item.key);
        })
        console.log('this.patientByRiskCategoryKeys::::', this.patientByRiskCategoryKeys);
      }
    })
  }
}
