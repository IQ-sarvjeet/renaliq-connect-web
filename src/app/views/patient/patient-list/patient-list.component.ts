import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
declare var $:any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  moment = moment;
  carePlans: any = [];
  patientDetail: any = {};
  constructor(private route: Router, private patientService: PatientService) {}
  actionHandler($event: any) {
    this.patientDetail = $event.detail;
    if($event.actionType === 'viewCarePlan') {
      $('#carePlanFilter').modal('show');
      // this.patientService.apiPatientCareplansEnrollmentNumberGet($event.detail.patient.enrollmentNo).subscribe({
      //   next: (response: any) => {
      //     console.log('response:', response);
      //   }
      // })
      this.patientService.apiPatientCareplansEnrollmentNumberGet('ZXDY06257796').subscribe({
        next: (response: any) => {
          this.carePlans = response;
          console.log('response:', response);
        }
      })
    } else {
      this.route.navigateByUrl(`/patient-profile/${this.patientDetail.patient.patientId}`, {state: {
        patientId: this.patientDetail.patient.patientId,
        enrollmentNo: this.patientDetail.patient.enrollmentNo
      }})
    }
  }
  downloadPlan(plan: any) {
    this.patientService.apiPatientCareplanDownloadPatientActivityIdGet(plan.patientActivityId).subscribe({
      next: (response: any) => {
        
      }
    })
  }
}
