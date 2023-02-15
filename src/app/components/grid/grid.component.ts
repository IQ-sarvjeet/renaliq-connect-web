import { Component } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  gridData: any = {
    items: [],
    pagingModel: { 
      pageSize: 2,
      totalRecords: 19,
      currentPage: 1,
      totalPages: 9
    }
  }
  ngOnInit() {}
  public gotoPage(page: number): void {
    this.gridData.pagingModel.currentPage = page;
  }
  // ngOnInit(): void {
  //   //______Data-Table
  //   $('#data-table').DataTable({
  //     language: {
  //       searchPlaceholder: 'Search...',
  //       sSearch: '',
  //       lengthMenu: '_MENU_',
  //     },
  //     searching: false,
  //     lengthChange: false,
  //     columnDefs: [
  //       {
  //         targets: [0, 8],
  //         orderable: false,
  //       },
  //     ],
  //   });
  // }
}
