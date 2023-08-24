import { Component, Input } from '@angular/core';
import { ClinicalQualityMatrixService, PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-care-member',
  templateUrl: './care-member.component.html',
  styleUrls: ['./care-member.component.scss']
})
export class CareMemberComponent {
  @Input() set profileState(value: any) {
    if (value && value.enrollmentNo) {
      this.loadCareGap(value.patientId);
      this.loadCareMembers(value.enrollmentNo);
    }
  }
  careMembers: any = []
  careGapList: any = [];
  constructor(private patientService: PatientService, private qualityMatrixService: ClinicalQualityMatrixService) {
    
  }
  private loadCareGap(value: any) {
    this.qualityMatrixService.apiClinicalQualityMatrixGetPatientPatientIdGet(value).subscribe({
      next: (response: any) => {
        let list: any = [];
        Object.keys(response).forEach((matrix: any) => {
          list = [...list, ...response[matrix].metrices]
        })
        const data = list.filter((item: any) => Number(item.numerator) === 0 && Number(item.denominator) === 1);
        this.careGapList = data;
      }
    })
  }
  loadCareMembers(value: string) {
    this.patientService.apiPatientCaremembersEnrollmentNumberGet(value).subscribe({
      next: (response: any) => {
        this.careMembers = response.filter((member: any) => {
          return member.name !== 'Unengaged Member' && member.type !== 'Admin';
        });
      }
    })
  }
}
