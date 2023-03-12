import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
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
        this.dateRangeChangeHandler.emit(event.valueText);
      }
  };
  @Input() admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
  @Output() dateRangeChangeHandler: EventEmitter<string> = new EventEmitter();
  ngOnInit() {
    this.dateRangeChangeHandler.emit(this.dateRangeFilter);
  }
}
