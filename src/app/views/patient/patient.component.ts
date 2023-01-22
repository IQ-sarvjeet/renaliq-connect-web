import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {
  ngOnInit(): void {
    //______Data-Table
    $('#data-table').DataTable({
      language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_',
      },
      searching: false,
      lengthChange: false,
    });
  }
}
