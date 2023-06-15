import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
import { DownloadService } from 'src/app/services/download.service';
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
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private downloadService: DownloadService) {}
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
      this.route.navigate([`/patient-profile/${this.patientDetail.patient.patientId}`, {
          patientId: this.patientDetail.patient.patientId ? this.patientDetail.patient.patientId: '',
          enrollmentNo: this.patientDetail.patient.enrollmentNo ? this.patientDetail.patient.enrollmentNo: ''
        }
      ])
    }
  }
  downloadPlan(plan: any) {
    const url: string = `${environment.baseApiUrl}/api/Patient/careplan/download/${plan.patientActivityId}`
    this.downloadService.startDownloading(this.elementRef, this.renderer, url, `Somatus Care Plan ${plan.patientActivityId}`);
  }
}
