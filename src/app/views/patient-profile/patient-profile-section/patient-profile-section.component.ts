import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
import { DownloadService } from 'src/app/services/download.service';
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
  constructor(private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private downloadService: DownloadService) {
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
    const url: string = `${environment.baseApiUrl}/api/Patient/careplan/download/${plan.patientActivityId}`;
    this.downloadService.startDownloading(this.elementRef, this.renderer, url, `Somatus Care Plan ${plan.patientActivityId}`);
  }
  getDays(assessmentDate: any) {
    const diff = new Date().getTime() - new Date(assessmentDate).getTime();
    const daydiff = (diff / (1000*60*60*24)).toFixed(0);
    return `${daydiff} ${Number(daydiff) > 1 ? 'Days': 'Day'}`;
  }
}
