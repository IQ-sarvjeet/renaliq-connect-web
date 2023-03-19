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
      this.loadMedication(value.enrollmentNo);
    }
  }
  careMembers: any = [
    {
      id: 43,
      name: "Maxxxxxx ry Brxxxxxx ks",
      type: "LMSW- Social Worker",
      mobileNo: "1111111111",
      emailId: "43*****@cca.com",
      photoUrl: "",
      address: null
    }
  ]
  constructor(private patientService: PatientService, private qualityMatrixService: ClinicalQualityMatrixService) {
    
  }
  private loadCareGap(value: string) {
    this.qualityMatrixService.apiClinicalQualityMatrixCaregapPatientPatientIdGet(value).subscribe({
      next: (response: any) => {
        console.log('care gap data:', response);
      }
    })
  }
  loadMedication(value: string) {
    this.patientService.apiPatientCaremembersEnrollmentNumberGet(value).subscribe({
      next: (response: any) => {

      }
    })
  }
}
