import { Component } from '@angular/core';

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
  patientsStatus: any = {
    admissions: 276,
    discharged: 234,
    dischargedPercent: 85,
  }
}
