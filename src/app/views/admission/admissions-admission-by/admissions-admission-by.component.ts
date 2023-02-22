import { Component, Input } from '@angular/core';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from '../interfaces/admission';

export type PatientByState = {
  dischargedPercent: number;
  title: string;
  totalPatients: number;
}

@Component({
  selector: 'app-admissions-admission-by',
  templateUrl: './admissions-admission-by.component.html',
  styleUrls: ['./admissions-admission-by.component.scss']
})
export class AdmissionsAdmissionByComponent {
  patienByStage: PatientByState[] = [];
  @Input() admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
  @Input() set dateRange(value: any) {
    this.getAdmissionSummary(value.fromDate, value.toDate);
  }
  constructor(private admissionService: AdmissionService){}
  ngOnInit() {
    
  }
  getAdmissionSummary(fromDate: Date, toDate: Date) {
    this.admissionService.apiAdmissionSummaryStageFromdateTodateGet(fromDate, toDate).subscribe((data: any) => {
      this.patienByStage = data;
    })
  }
}
