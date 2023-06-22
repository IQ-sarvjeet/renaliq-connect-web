import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { BarChartConfig } from 'src/app/interfaces/bar-chart-config';
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
    title: 'Patients by Stage',
    apiUrl: 'Patient/summary/stage/BAR',
  };
  patientByLOB: ProgressBarChartWidgetInput = {
    title: 'Patients by LOB',
    apiUrl: 'Patient/summary/lob',
  };
  patientByPayer: ProgressBarChartWidgetInput = {
    title: 'Patients by Payer',
    apiUrl: 'Patient/summary/payer',
  };
  patientByRiskCategory: ProgressBarChartWidgetInput = {
    title: 'Patients by Risk Category',
    apiUrl: 'Patient/summary/riskcategory',
  };
  patientByHCC: BarChartConfig = {
    title: 'Patients by HCC*',
    apiUrl: 'Hcc/patient-count',
    footer: '* Patients may be counted more than once if they have multiple conditions',
  };
  patients: DataCardInput = {
    iconClass: 'fa fa-user-circle',
    cardTitle: Messages.attributed,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissions: DataCardInput = {
    iconClass: 'fa fa-trophy',
    cardTitle: Messages.admissions,
    count: '-',
    percentile: null,
    performance: 'down',
  };
  engagedPatients: DataCardInput = {
    iconClass: 'fa fa-users',
    cardTitle: Messages.engagedPatients,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  admissionRecent: DataCardInput = {
    iconClass: 'fa fa-users',
    cardTitle: Messages.admissions7Days,
    count: '-',
    percentile: null,
    performance: 'up',
  };
  tempdata1: DataCardInput = {
    iconClass: 'fa fa-trophy',
    cardTitle: '',
    count: '-',
    percentile: null,
    performance: 'down',
  };
  tempdata2: DataCardInput = {
    iconClass: 'fa fa-users',
    cardTitle: '',
    count: '-',
    percentile: null,
    performance: 'up',
  };
  patientByStageKeys: any = [];
  patientByRiskCategoryKeys: any = [];
  genderData: any = [
    {
      key: 'M',
      value: '-',
    },
    {
      key: 'F',
      value: '-',
    },
  ];
  loadingGenders: boolean = false;
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
      },
      error: (error: any) => {},
    });
    this.patientService.apiPatientSummaryRiskcategoryGet().subscribe({
      next: (stageData: any) => {
        stageData.forEach((item: any) => {
          this.patientByRiskCategoryKeys.push(item.key);
        });
      },
      error: (error: any) => {},
    });
    this.loadingGenders = true;
    this.patientService.apiPatientSummaryGenderGet().subscribe({
      next: (genderData: any) => {
        this.genderData = genderData;
        this.loadingGenders = false;
      },
      error: (error: any) => {
        this.loadingGenders = false;
      },
    });
  }
}
