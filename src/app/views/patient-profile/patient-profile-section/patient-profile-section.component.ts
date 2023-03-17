import { Component, OnInit } from '@angular/core';
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
  profile: any = {
    id: 961,
    name: "Lixxxxxx ne",
    dateofBirth: "1957-10-22T00:00:00",
    age: 65,
    gender: "F",
    preferredTime: "",
    language: "-",
    status: "Written Consent (8/22/2019)",
    requiredTimeSlot: 0,
    appointmentType: "Dual",
    enrollmentNumber: "ZXDY06257796",
    address: " 10***** **** ***** Rd ***** **** *****, Brownsville, Tennessee 38012",
    payerName: null,
    memberId: "ZXDY06257796",
    email: "*****@*******",
    state: [
      "1240"
    ],
    zipcode: "38012",
    timeZone: "US/Central",
    lat: 35.6074339,
    lng: -89.2847251,
    eligibilityEndDate: "2021-12-31T00:00:00",
    addressType: "Home",
    clientName: "BCBSTN",
    clientId: 4584,
    lineOfBusinessId: 2,
    enableCareTeamMapping: false,
    isCentralTeamOutReachMode: false,
    phoneNumber: 584672294439,
    npEligibilityStatus: ""
  }
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
    this.patientService.apiPatientDetailEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (details: any) => {
        this.profile = details;
      }
    })
    this.patientService.apiPatientCareplansEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (response: any) => {
        this.carePlans = response
      }
    })
  }
  downloadPlan(plan: any) {
    this.patientService.apiPatientCareplanDownloadPatientActivityIdGet(plan.patientActivityId).subscribe({
      next: (response: any) => {
        
      }
    })
  }
}
