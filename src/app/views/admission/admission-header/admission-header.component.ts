import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from '../interfaces/admission';

const startOfWeek = moment().startOf('week').toDate();
const endOfWeek   = moment().endOf('week').toDate();

@Component({
  selector: 'app-admission-header',
  templateUrl: './admission-header.component.html',
  styleUrls: ['./admission-header.component.scss']
})
export class AdmissionHeaderComponent {
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  dateRangeFilter: any = `${moment(startOfWeek).format('DD/MM/YYYY')} - ${moment(endOfWeek).format('DD/MM/YYYY')}`;

  dateRangeOptions: MbscDatepickerOptions = {
      theme: 'ios',
      dateFormat: 'DD/MM/YYYY',
      controls: ['calendar'],
      select: 'range',
      defaultValue: this.dateRangeFilter,
      onChange: (value: any) => {
      },
      onActiveDateChange: (event, inst) => {
      },
      onClose: (event) => {
        this.dateRangeFilter = event.valueText;
        this.dateRangeChangeHandler.emit(event.valueText);
        this.renderSummary();
      }
  };
  admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
  @Output() dateRangeChangeHandler: EventEmitter<string> = new EventEmitter();
  constructor(private admissionService: AdmissionService) {}
  ngOnInit() {
    this.dateRangeChangeHandler.emit(this.dateRangeFilter);
    this.renderSummary();
  }
  private renderSummary() {
    const todayDate = new Date();
    const datePrior90 = new Date(new Date().setDate(todayDate.getDate() - 90));
    const dateRange: any = {
      fromDate: moment(datePrior90).format('YYYY-MM-DD'),
      toDate: moment(todayDate).format('YYYY-MM-DD')
    }
    this.admissionService.apiAdmissionSummaryFromdateTodateGet(dateRange.fromDate, dateRange.toDate).subscribe((data: any) => {
      this.admissionHeaders = data;
    })
  }
}
