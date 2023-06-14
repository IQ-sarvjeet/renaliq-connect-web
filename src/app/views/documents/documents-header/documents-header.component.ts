import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';

const todayDate = new Date();
const datePrior90 = new Date(new Date().setDate(todayDate.getDate() - 90));

@Component({
  selector: 'app-documents-header',
  templateUrl: './documents-header.component.html',
  styleUrls: ['./documents-header.component.scss']
})
export class DocumentsHeaderComponent {
 // dateRangeFilter: any = `${moment(datePrior90).format('MM/DD/YYYY')} - ${moment(todayDate).format('MM/DD/YYYY')}`;
 dateRangeFilter: any ='';
 dateRangeOptions: MbscDatepickerOptions = {
    theme: 'ios',
    dateFormat: 'MM/DD/YYYY',
    controls: ['calendar'],
    select: 'range',
    defaultValue: this.dateRangeFilter,
    onChange: (value: any) => {
    },
    onActiveDateChange: (event, inst) => {
    },
    onClose: (event) => {
      this.dateRangeFilter = event.valueText;
      this.documentFilter = {
        ...this.documentFilter,
        fromDate: event.value[0],
        toDate: event.value[1]
      }
      this.filterChanged();
    }
};
  documentFilter: any = {
    searchKey: '',
    sortBy: 'CreatedOn',
    fromDate: moment(datePrior90),
    toDate: moment(todayDate)
  }
  constructor(private eventService: EventService,
    private router: Router,
    private fb: FormBuilder) {}
  ngOnInit() {
    this.eventService.documentsFilterEvent(this.documentFilter);
  }
  public searchHandler($event: any) {
    this.documentFilter = {
      ...this.documentFilter,
      searchKey: $event.target.value
    }
    this.filterChanged();
  }
  public selectSortHandler($event: any) {
    this.documentFilter = {
      ...this.documentFilter,
      sortBy: $event.target.value
    }
    this.filterChanged();
  }
  public filterChanged(): void {
    if (this.router.url.indexOf('/documents/recentdocuments') !== -1) {
      this.router.navigate(['/documents/sharedbysomatus']);
    }
    this.eventService.documentsFilterEvent(this.documentFilter);
  }
}
