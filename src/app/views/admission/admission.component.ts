import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent {
  ngOnInit(): void {
    //______Data-Table
    $('#admissionTable').DataTable({
      language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_',
      },
      searching: false,
      lengthChange: false,
      columnDefs: [
        {
          targets: [0, 9],
          orderable: false,
        },
      ],
    });
  }
}
