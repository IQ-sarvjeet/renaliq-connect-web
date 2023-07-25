import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-combination-chart',
  templateUrl: './combination-chart.component.html',
  styleUrls: ['./combination-chart.component.scss']
})
export class CombinationChartComponent implements OnInit {
  showLoading: boolean = false;
  Highcharts = Highcharts;
  @Input() chartData: any;

  option: any = {
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      stackLabels: {
        enabled: true
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: []
  };

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }
  renderChart() {
    this.option = {
      ...this.option,
      xAxis: {
        ...this.option.xAxis,
        categories: this.chartData.categories
      },
      series: this.chartData.series
    }
  }
}
