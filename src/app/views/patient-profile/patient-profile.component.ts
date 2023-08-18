import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PatientService } from 'src/app/api-client';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

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
    imageUrl: null,
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
    private httpClient: HttpClient,
    private eventService: EventService,
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
          this.profileDetail = details;
          const url: string = `${environment.baseApiUrl}/api/Patient/profile-image/${this.profileDetail.enrollmentNumber}`;
          let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/pdf',
          });
          let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
          this.httpClient.get(url, requestOptions).subscribe({
            next: (response: any) => {
              if (response.size === 0) {
                this.eventService.openToaster({
                  showToster: true,
                  message: `Error in downloading file.`,
                  type: 'danger',
                });
                return;
              }
              const blob = new Blob([response], {
                type: 'data:application/pdf;base64',
              });
              const imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
              this.profileDetail.imageUrl = imageUrl
            }
          });
        }
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
