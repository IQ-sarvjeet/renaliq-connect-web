import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-patient-profile-section',
  templateUrl: './patient-profile-section.component.html',
  styleUrls: ['./patient-profile-section.component.scss']
})
export class PatientProfileSectionComponent implements OnInit  {
  moment = moment;
  @Input() profileDetail: any = {}
  carePlans: any = [];
  routeState: any = {
    patientId: null,
    enrollmentNo: null
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private patientService: PatientService) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.patientDetails(this.routeState);
  }
  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
  }
  patientDetails(routeState: any) {
    if(!routeState || !routeState.enrollmentNo) return;
    this.patientService.apiPatientCareplansEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (response: any) => {
        this.carePlans = response
      }
    })
  }
  downloadPlan(plan: any) {
    this.patientService.apiPatientCareplanDownloadPatientActivityIdGet(plan.patientActivityId).subscribe({
      next: (response: any) => {
        console.log('Download response:', response);
      }
    })
  }
}
