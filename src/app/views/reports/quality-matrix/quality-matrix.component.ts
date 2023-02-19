import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import { BarChartConfig } from 'src/app/interfaces/bar-chart-config';
import { Router } from '@angular/router';
import { ClinicalQualityMatrixService } from '../../../api-client';

@Component({
  selector: 'app-quality-matrix',
  templateUrl: './quality-matrix.component.html',
  styleUrls: ['./quality-matrix.component.scss']
})
export class QualityMatrixComponent {
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
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
  qualityMatircList: any = [];

  constructor(private _qualityService: ClinicalQualityMatrixService,
    private route: Router,) { }

  ngOnInit() {
    this.getQualityMatricList();
  }


  getQualityMatricList() {

    this._qualityService.apiClinicalQualityMatrixGetGet().subscribe((result: any) => {
      this.qualityMatircList = result.clinicalQualityMatrics;
      console.log(result);
    },
      (error) => {

      });
    };

    chartConfig: BarChartConfig = {
        apiUrl: 'assets/mockData/chartQualityMatrix.json',
        title: '',
        colors: ['#c4c4c4', '#448c00', '#ff6708', '#ff3700']
    }
    openChartModal: boolean = false;
    openChart() {
        this.openChartModal = true;
        setTimeout(() => {
            this.openChartModal = false;
        }, 2000);
    }
    modalClosed() {
        this.openChartModal = false;
    }

}
