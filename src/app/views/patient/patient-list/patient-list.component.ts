import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { environment } from 'src/environments/environment';
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
  loadingCarePlan: boolean = false;
  constructor(private route: Router,
    private patientService: PatientService,
    private httpClient: HttpClient,
    private _localStorage: LocalStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer2) {}
  actionHandler($event: any) {
    this.patientDetail = $event.detail;
    if($event.actionType === 'viewCarePlan') {
      this.loadingCarePlan = true;
      $('#carePlanFilter').modal('show');
      this.patientService.apiPatientCareplansEnrollmentNumberGet($event.detail.patient.enrollmentNo).subscribe({
        next: (response: any) => {
          this.loadingCarePlan = false;
          this.carePlans = response;
        },
        error: () => {
          this.loadingCarePlan = false;
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
    const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
      'Authorization': 'JWT ' + token
    });

    let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
    this.httpClient.get(`${environment.baseApiUrl}api/Patient/careplan/download/${plan.patientActivityId}`, requestOptions).subscribe({
      next: (response: any) => {
        console.log('response:', response);
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
}
