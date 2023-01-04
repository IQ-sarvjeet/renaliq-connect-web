import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

type BarChartConfig = {
  title: string;
  axisData: [];
  seriesData: [];
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() config: BarChartConfig = {} as BarChartConfig
  ngOnInit() {
    const chartDom = document.getElementById('barChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      let option: EChartsOption;;

      option = {
        title: {
          text: "Patient Age"
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['40', '60', '80']
        },
        series: [
          {
            data: [120, 200, 150],
            type: 'bar'
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
