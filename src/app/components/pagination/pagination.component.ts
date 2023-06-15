import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  paginationRange: number[] = [];
  displaySize: any = 2;
  private rangeStart: number = 0;
  paginationDetail = {
    pageSize: 2,
    totalRecords: 19,
    currentPage: 1,
    totalPages: 9,
    toRecords: 0, 
    show: false
  }
  @Input() set pagingModel(value: any) {
    if (value) {
      this.paginationDetail = value;
      this.getNavigablePages();
    }
  }
  @Input() attributePatients: any = {
    totalPatients: 0,
    display: false
  }
  @Output() gotoPageHandler = new EventEmitter<number>();
  public gotoPage(page: number): void {
    this.gotoPageHandler.emit(page);
  }
  getNavigablePages() {
    const pages = [];
    if(this.paginationDetail.totalRecords == 0)
      this.paginationDetail.show = false;
    else
      this.paginationDetail.show = true;

    this.paginationDetail.toRecords = this.paginationDetail.currentPage * this.paginationDetail.pageSize;
    if(this.paginationDetail.toRecords > this.paginationDetail.totalRecords )
      this.paginationDetail.toRecords = this.paginationDetail.totalRecords;


    let right = this.paginationDetail.totalPages > 4 ? 4 : this.paginationDetail.totalPages - 1 ;
    if(this.paginationDetail.currentPage === this.paginationDetail.totalPages) {
      this.rangeStart = this.paginationDetail.totalPages - this.displaySize * 2 - 1;
    }
    if (this.paginationDetail.currentPage > 3) {
      if (this.paginationDetail.currentPage <= (this.paginationDetail.totalPages - this.displaySize)) {
        this.rangeStart = Math.max(1, this.paginationDetail.currentPage - this.displaySize) - 1;
      }
      right = Math.min(this.paginationDetail.totalPages, this.paginationDetail.currentPage + this.displaySize) - 1
    } else {
      this.rangeStart = 0;
    }

  

    for (let i = this.rangeStart; i <= right; i++) {
        pages.push(i)
    }
    
    this.paginationRange = [...pages];
  }
}
