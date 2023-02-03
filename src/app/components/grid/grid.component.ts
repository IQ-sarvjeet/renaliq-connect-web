import { Component } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
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
      columnDefs: [
        {
          targets: [0, 8],
          orderable: false,
        },
      ],
    });
  }
}
