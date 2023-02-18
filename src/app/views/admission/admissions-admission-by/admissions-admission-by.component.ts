import { Component, Input } from '@angular/core';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from '../interfaces/admission';

@Component({
  selector: 'app-admissions-admission-by',
  templateUrl: './admissions-admission-by.component.html',
  styleUrls: ['./admissions-admission-by.component.scss']
})
export class AdmissionsAdmissionByComponent {
  patienByStage: any = [
    {
      title: "CKD Stage 4",
      dischargedPercent: 78,
      totalPatients: 162,
    },
    {
      title: "CKD Stage 3a",
      dischargedPercent: 50,
      totalPatients: 382,
    },
    {
      title: "CKD Stage 3b",
      dischargedPercent: 20,
      totalPatients: 276,
    },
    {
      title: "EKSD",
      dischargedPercent: 60,
      totalPatients: 234,
    }
  ]
  @Input() admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
  @Input() set dateRange(value: any) {
    this.getAdmissionSummary(value.fromDate, value.toDate);
  }
  constructor(private admissionService: AdmissionService){}
  ngOnInit() {
    
  }
  getAdmissionSummary(fromDate: Date, toDate: Date) {
    this.admissionService.apiAdmissionSummaryStageFromdateTodateGet(fromDate, toDate).subscribe((data: any) => {
      console.log('Addmission summary:', data);
    })
  }
}
