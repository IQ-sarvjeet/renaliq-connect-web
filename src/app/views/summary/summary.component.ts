import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import { PatientService } from 'src/app/api-client';
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
    count: '',
    percentile: null,
    performance: 'up',
  };
  admissions: DataCardInput = {
    iconClass: 'icon-target',
    cardTitle: 'Admissions',
    count: '',
    percentile: null,
    performance: 'down',
  };
  engagedPatients: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: 'Engaged Patients',
    count: '',
    percentile: null,
    performance: 'up',
  };
  admissionRecent: DataCardInput = {
    iconClass: 'icon-people',
    cardTitle: 'Admission',
    count: '',
    percentile: null,
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

  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  dateRangeFilter: any = "02/06/2023 - 02/14/2023";
  dateRangeOptions: MbscDatepickerOptions = {
      theme: 'ios',
      controls: ['calendar'],
      select: 'range',
      defaultValue: this.dateRangeFilter,
      onChange: (value: any) => {
        console.log('Date change value:', value);
      },
      onActiveDateChange: (event, inst) => {
        console.log('onActiveDateChange:', event, ':::event::', inst);
      },
      onClose: (event) => {
        console.log('onClose:', event);
      }
  };
  constructor(private _patientService: PatientService) {
    
  }
  ngOnInit() {
    this._patientService.apiPatientCountGet().subscribe((response: any) => {
      this.admissions = {
        ...this.admissions,
        ...response.totalAdmission
      };
      this.patients = {
        ...this.patients,
        ...response.totalPatient
      }
      this.engagedPatients = {
        ...this.engagedPatients,
        ...response.totalEngagedPatient
      }
      this.admissionRecent = {
        ...this.admissionRecent,
        ...response.totalRecentAdmission
      }

    })
  }
}
