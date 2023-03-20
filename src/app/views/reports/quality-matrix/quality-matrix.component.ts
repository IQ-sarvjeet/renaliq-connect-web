import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import { BarChartConfig } from 'src/app/interfaces/bar-chart-config';
import { Router } from '@angular/router';
import { ClinicalQualityMatrixService } from '../../../api-client';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-quality-matrix',
  templateUrl: './quality-matrix.component.html',
  styleUrls: ['./quality-matrix.component.scss']
})
export class QualityMatrixComponent {
  moment = moment;
  // @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  dateRangeFilter: any = "02/06/2023 - 02/14/2023";
  dateRangeOptions: MbscDatepickerOptions = {
      theme: 'ios',
      controls: ['calendar'],
      select: 'range',
      defaultValue: this.dateRangeFilter,
      onChange: (value: any) => {
        console.log('Date change value:', value);
      },
      onActiveDateChange: (event, inst) => {
        console.log('onActiveDateChange:', event, ':::event::', inst);
      },
      onClose: (event) => {
        console.log('onClose:', event);
      }
  };
  chartConfig: BarChartConfig = {
    apiUrl: 'assets/mockData/chartQualityMatrix.json',
    title: '',
    colors: ['#c4c4c4', '#448c00', '#ff6708', '#ff3700']
  }
  showLoading: boolean = false;
  openChartModal: boolean = false;
  qualityMatircList: any = [];
  dateList: any = [];
  selectedDate: number = 0;
  selectedDateLebel : string = "";
  constructor(private _qualityService: ClinicalQualityMatrixService) { }

  ngOnInit() {
    this.showLoading = true;
    this._qualityService.apiClinicalQualityMatrixAvailablePeriodGet().subscribe({
      next: (response: any) => {
        if(response.length > 0) {
          this.dateList = response;
          this.selectedDate = this.dateList[0].id;
          this.getQualityMatricList(this.selectedDate);
        }
      }
    })
  }
  getQualityMatricList(periodId: number) {
    this.showLoading = true;
    this._qualityService.apiClinicalQualityMatrixGetPracticePeriodIdGet(periodId).subscribe({
      next: (result: any) => {
        this.showLoading = false;
        const matrixArr: any = [];
        Object.keys(result).forEach((item) => {
          matrixArr.push(result[item]);
        })
        this.qualityMatircList = matrixArr;
      },
      error: () => {
        this.showLoading = false;
      }
    })
  }
  openChart() {
      this.openChartModal = true;
      setTimeout(() => {
          this.openChartModal = false;
      }, 2000);
  }
  modalClosed() {
      this.openChartModal = false;
  }
  dateSelectionHandler($event: any) {
    this.selectedDate = Number($event.target.value);
    this.selectedDateLebel = $event.target.options[$event.target.options.selectedIndex].text;
    this.getQualityMatricList(this.selectedDate);
  }
}
