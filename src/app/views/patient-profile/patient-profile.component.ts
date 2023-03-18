import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent {
  profileDetail: any = {
    id: null,
    name: '',
    dateofBirth: "",
    age: null,
    gender: "",
    preferredTime: "",
    language: "-",
    status: "",
    requiredTimeSlot: 0,
    appointmentType: "",
    enrollmentNumber: "",
    address: "",
    payerName: null,
    memberId: "",
    email: "",
    state: [
      ""
    ],
    zipcode: "",
    timeZone: "",
    lat: null,
    lng: null,
    eligibilityEndDate: "",
    addressType: "",
    clientName: "",
    clientId: null,
    lineOfBusinessId: null,
    enableCareTeamMapping: false,
    isCentralTeamOutReachMode: false,
    phoneNumber: null,
    npEligibilityStatus: ""
  }
  routeState: any = {
    patientId: null,
    enrollmentNo: null
  }
  constructor(private router: Router, private patientService: PatientService, private activatedRoute: ActivatedRoute) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.patientDetails(this.routeState);
  }
  ngOnInit() {
  }
  patientDetails(routeState: any) {
    if(!routeState || !routeState.enrollmentNo) return;
    this.patientService.apiPatientDetailEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (details: any) => {
        this.profileDetail = details;
      }
    })
  }
}
