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
  medications: any = [
    {
      id: 3345,
      drugName: "Albuterol Sulfate",
      unit: "mg",
      strength: "2",
      form: "pill",
      delivery: "PO",
      specialInstruction: "",
      frequency: null,
      discontinued: false
    },
    {
      id: 3350,
      drugName: "Cetirizine ",
      unit: "mg",
      strength: "10 ",
      form: "pill",
      delivery: "po",
      specialInstruction: "",
      frequency: null,
      discontinued: false
    }
  ]
  constructor(private patientService: PatientService) {
    
  }
  loadMedication(value: string) {
    this.patientService.apiPatientMedicationEnrollmentNumberGet(value).subscribe({
      next: (response: any) => {

      }
    })
  }
}
