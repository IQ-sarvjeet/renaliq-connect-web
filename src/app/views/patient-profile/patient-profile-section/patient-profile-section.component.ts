import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
import { EventService } from 'src/app/services/event.service';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-profile-section',
  templateUrl: './patient-profile-section.component.html',
  styleUrls: ['./patient-profile-section.component.scss']
})
export class PatientProfileSectionComponent implements OnInit  {
  moment = moment;
  @Input() profileDetail: any = {};
  @Input() patientStatus: any = {};
  carePlans: any = [];
  @Input() routeState: any = {
    patientId: null,
    enrollmentNo: null
  }
  loadingCarePlan: boolean = false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private httpClient: HttpClient,
    private _localStorage: LocalStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private eventService: EventService) {
    // this.routeState = this.router.getCurrentNavigation()?.extras.state;
    // this.patientDetails(this.routeState);
  }
  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
  }
  patientDetails() {
    if(!this.routeState || !this.routeState.enrollmentNo) return;
    this.loadingCarePlan = true;
    this.patientService.apiPatientCareplansEnrollmentNumberGet(this.routeState.enrollmentNo).subscribe({
      next: (response: any) => {
        this.loadingCarePlan = false;
        this.carePlans = response;
      },
      error: () => {
        this.loadingCarePlan = false;
      }
    })
  }
  downloadPlan(plan: any) {
    const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
      'Authorization': 'JWT ' + token
    });

    let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
    this.httpClient.get(`${environment.baseApiUrl}/api/Patient/careplan/download/${plan.patientActivityId}`, requestOptions).subscribe({
      next: (response: any) => {
        console.log('response:', response);
        if (response.size === 0) {
          this.eventService.openToaster({
            showToster: true,
            message: `Error in downloading file.`,
            type: 'warning',
          });
          return;
        }
        const blob = new Blob([response], {
          type: 'data:application/pdf;base64',
        });
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
        this.downloadFile(blob, `Somatus Care Plan ${plan.patientActivityId}.pdf`);
      }
    })
  }
  private downloadFile(blob: any, fileName: string): void {
    // IE Browser
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //  window.navigator.msSaveOrOpenBlob(blob, fileName);
    //  return;
    // }
    // Other Browsers
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'download', fileName);
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    this.renderer.appendChild(this.elementRef.nativeElement, link);
    link.click();
    this.renderer.removeChild(this.elementRef.nativeElement, link);
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }
  getDays(assessmentDate: any) {
    const diff = new Date().getTime() - new Date(assessmentDate).getTime();
    const daydiff = (diff / (1000*60*60*24)).toFixed(0);
    return `${daydiff} ${Number(daydiff) > 1 ? 'Days': 'Day'}`;
  }
}
