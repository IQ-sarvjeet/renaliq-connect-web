import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent {
  profileNotFound: boolean = false;
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
  patientStatus: any = {
    carePlanStatus: "",
    dischargeDate: null,
    isEngaged: true,
    lastAssessmentDate: null,
    lob: "",
    payer: "",
    primaryChronicCondition: "",
    riskCagtegory: "",
    riskCategory: "",
    stage: "",
    status:null
  }
  private routerEventSubscription: any;
  routeState: any = {
    patientId: null,
    enrollmentNo: null,
  }
  constructor(private router: Router,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute) {
    this.routerEventSubscription = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd && event.url.indexOf('/patient-profile') !== -1) {
          const {params} = this.activatedRoute.snapshot;
          this.routeState = params;
          this.patientDetails(params);
        }
    })
  }
  ngOnInit() {
  }
  patientDetails(routeState: any) {
    if(!routeState || !routeState.enrollmentNo) {
      this.profileNotFound = true;
      return;
    };
    this.patientService.apiPatientStatusEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (details: any) => {
        if(!details) {
          this.profileNotFound = true;
        } else {
          this.profileNotFound = false;
        }
        this.patientStatus = details;
      },
      error: (error: any) => {
        this.profileNotFound = true;
      }
    })
    this.patientService.apiPatientDetailEnrollmentNumberGet(routeState.enrollmentNo).subscribe({
      next: (details: any) => {
        if(!details) {
          this.profileNotFound = true;
        } else {
          this.profileNotFound = false;
        }
        this.profileDetail = details;
      },
      error: (error: any) => {
        this.profileNotFound = true;
      }
    })
  }
  reloadPage() {
    window.location.reload();
  }
  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }
}
