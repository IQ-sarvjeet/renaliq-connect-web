import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagingModel: any = {
    pageSize: 2,
    totalRecords: 19,
    currentPage: 1,
    totalPages: 9
  }
  @Output() gotoPageHandler = new EventEmitter<number>();
  public gotoPage(page: number): void {
    this.gotoPageHandler.emit(page);
  }
}
