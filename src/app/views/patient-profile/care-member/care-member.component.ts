import { Component, Input } from '@angular/core';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-care-member',
  templateUrl: './care-member.component.html',
  styleUrls: ['./care-member.component.scss']
})
export class CareMemberComponent {
  @Input() set profileState(value: any) {
    if (value && value.enrollmentNo) {
      this.loadMedication(value.enrollmentNo);
    }
  }
  constructor(private patientService: PatientService) {
    
  }
  loadMedication(value: string) {
    this.patientService.apiPatientCaremembersEnrollmentNumberGet(value).subscribe({
      next: (response: any) => {

      }
    })
  }
}
