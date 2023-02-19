import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { GridModel } from 'src/app/interfaces/grid.model';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  numeratorList :any=[];
  metricList :any=[];
 
  ngOnInit(): void {
    this.bindMetricList();
    this.bindNumeratorList();
  }
  constructor(private _interactionService: InteractionService){

  }
  filterModel: ClinicalPatientMetricFilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    filter: {
      patientName: '',
      metricId: 0,
      numerator: 0,
      dateRange: []
    }
  };
  bindNumeratorList() {
    this.numeratorList = [
      { 'Id': 167, 'Name': '167' },
      { 'Id': 520, 'Name': '520' },
      { 'Id': 733, 'Name': '733' },
      { 'Id': 948, 'Name': '948' },
      { 'Id': 814, 'Name': '814' },
      { 'Id': 326, 'Name': '326' },
    ]    
  }
  bindMetricList() {
    this.metricList = [
      { 'Id': 1, 'Name': 'ACEI/ARB Adherence/Day' },
      { 'Id': 2, 'Name': 'Acute Inpatient Admissions per 1,000 - CKD' },
      { 'Id': 3, 'Name':  'Acute Inpatient Admissions per 1,000 - ESKD'},
      { 'Id': 4, 'Name': 'Advanced Care Planning (ACP)' },
      { 'Id': 5, 'Name': 'Blood Pressure Management' },
      { 'Id': 6, 'Name': 'Engagement Rate' },
      { 'Id': 7, 'Name': 'Completed Transplant Evaluation Rate' },
      { 'Id': 8, 'Name': 'Diabetic Management - HbA1c less than 8.0' },
      { 'Id': 9, 'Name': 'Diuretics Adherence' },
      { 'Id': 10, 'Name': 'PD /Home New Starts' },
      { 'Id': 11, 'Name': 'Planned Dialysis Starts' },
      { 'Id': 12, 'Name': 'Readmission Rate (30)day' },
      { 'Id': 13, 'Name': 'Statin Adherence' },
      { 'Id': 14, 'Name': 'SGLT2 Inhibitor Rate' },
      { 'Id': 15, 'Name': 'Vascular Access Prevalence (CVC Prevalence Rate)' },
    ]    
  }
  onNumeratorSelected(event:any){
   this.filterModel.filter.numerator=event.value;
   this.setFilter();
  }
  onMetricSelected(event:any){
    this.filterModel.filter.metricId=event.value;
    this.setFilter();
   }
   setFilter(){
     this._interactionService.setClinicalPatientMatrixFilter(this.filterModel);
   }
}
