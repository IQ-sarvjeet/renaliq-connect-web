import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/api-client';
declare var $:any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  patientDetail: any = {};
  constructor(private route: Router, private patientService: PatientService) {}
  actionHandler($event: any) {
    this.patientDetail = $event.detail;
    if($event.actionType === 'viewCarePlan') {
      $('#carePlanFilter').modal('show');
      this.patientService.apiPatientCareplansEnrollmentNumberGet($event.detail.patient.enrollmentNo).subscribe({
        next: (response: any) => {
          console.log('response:', response);
        }
      })
    } else {
      // this.route.navigate([`patient-profile/${this.patientDetail.patient.patientId}`]);
      // this.route.navigate([`patient-profile`], );
      this.route.navigateByUrl(`/patient-profile/${this.patientDetail.patient.patientId}`, {state: {
        patientId: this.patientDetail.patient.patientId,
        enrollmentNo: this.patientDetail.patient.enrollmentNo
      }})
    }
  }
}
