import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  // paginationRange: number[] = [];
  displaySize: any = 2;
  // paginationDetail = {
  //   pageSize: 2,
  //   totalRecords: 19,
  //   currentPage: 1,
  //   totalPages: 9
  // }
  // @Input() set pagingModel(value: any) {
  //   if (value) {
  //     this.paginationDetail = value;
  //     this.paginationRange = this.getNavigablePages();
  //   }
  // }
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
  getNavigablePages(): number[] {
    const pages = [];
    let left = 0;
    let right = 4;
    if (this.pagingModel.currentPage > 2) {
      left = Math.max(1, this.pagingModel.currentPage - this.displaySize)
      right = Math.min(this.pagingModel.totalPages, this.pagingModel.currentPage + this.displaySize)
    }
    console.log(left,':::left:::', right);
    for (let i = left; i <= right; i++) {
        pages.push(i)
    }
    return this.pagingModel.totalPages
  }
}
