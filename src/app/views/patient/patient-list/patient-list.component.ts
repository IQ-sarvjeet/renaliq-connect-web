import { Component } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  openDialog($event: any) {
    $('#carePlanFilter').modal('show');
  }
}
