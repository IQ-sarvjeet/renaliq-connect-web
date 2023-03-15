import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/api-client';
declare var $:any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  constructor(private route: Router, private patientService: PatientService) {}
  actionHandler($event: any) {
    if($event.actionType === 'viewCarePlan') {
      $('#carePlanFilter').modal('show');
      this.patientService.apiPatientCareplansEnrollmentNumberGet('ZXDY06257796').subscribe({
        next: (response: any) => {
          console.log('response:', response);
        }
      })
    } else {
      this.route.navigate(['patient-profile']);
    }
    
  }
}
