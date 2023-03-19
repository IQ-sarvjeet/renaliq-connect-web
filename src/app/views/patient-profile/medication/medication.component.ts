import { Component, Input } from '@angular/core';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  @Input() set profileState(value: any) {
    if (value && value.enrollmentNo) {
      this.loadMedication(value.enrollmentNo);
    }
  }
  medications: any = []
  constructor(private patientService: PatientService) {
    
  }
  loadMedication(value: string) {
    this.patientService.apiPatientMedicationEnrollmentNumberGet(value).subscribe({
      next: (response: any) => {
        this.medications = response;
      }
    })
  }
}
