import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-by-stage',
  templateUrl: './patient-by-stage.component.html',
  styleUrls: ['./patient-by-stage.component.scss']
})
export class PatientByStageComponent {
  chartConfig: any = { apiUrl: 'Patient/summary/stage', title: '' };
}
