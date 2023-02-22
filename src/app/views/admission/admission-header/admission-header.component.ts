import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import { AdmissionHeaders } from '../interfaces/admission';

@Component({
  selector: 'app-admission-header',
  templateUrl: './admission-header.component.html',
  styleUrls: ['./admission-header.component.scss']
})
export class AdmissionHeaderComponent {
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  dateRangeFilter: any = "02/06/2023 - 02/14/2023";
  dateRangeOptions: MbscDatepickerOptions = {
      theme: 'ios',
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
}
