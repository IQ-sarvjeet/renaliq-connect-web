import { Component } from '@angular/core';
import { BarChartConfig } from 'src/app/interfaces/bar-chart-config';

@Component({
  selector: 'app-quality-matrix',
  templateUrl: './quality-matrix.component.html',
  styleUrls: ['./quality-matrix.component.scss']
})
export class QualityMatrixComponent {
  chartConfig: BarChartConfig = {
    apiUrl: 'assets/mockData/chartQualityMatrix.json',
    title: '',
    colors: ['#c4c4c4', '#448c00', '#ff6708', '#ff3700']
  }
  openChartModal: boolean = false;
  openChart(){
    this.openChartModal = true;
    setTimeout(() => {
      this.openChartModal = false;
    }, 2000);
  }
  modalClosed(){
    this.openChartModal = false;
  }
}
