import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import * as Highcharts from 'highcharts';
import { Messages } from 'src/app/shared/common-constants/messages';
import * as echarts from 'echarts';

type ChartApiResponse = {
  categories: any;
    series: any;
  }
export type BarChartConfig = {
  apiUrl: string;
  title: string;
}

@Component({
  selector: 'app-bar-chart-horizontal',
  templateUrl: './bar-chart-horizontal.component.html',
  styleUrls: ['./bar-chart-horizontal.component.scss']
})
export class BarChartHorizontalComponent {
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLDivElement>;
  showLoading: boolean = false;
  errorMessage: string | null = null;
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  // Highcharts = Highcharts;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  // option: any = {
  //       chart: {
  //         type: "bar"
  //       },
  //       colors: [
  //           '#0D2F4F',
  //           '#5A7287',
  //           '#95A3B2',
  //           '#B2BCC7'
  //       ],
  //       title: {
  //         text: ''
  //       },
  //       xAxis:{
  //         categories: []
  //       },
  //       yAxis: {
  //         // min:0,
  //         // max:2000,
  //         tickInterval: 500,
  //         title: {
  //           text: "Patient By Age",
  //           align: "high"
  //         },
  //         labels: {
  //           overflow: "justify"
  //         },
          
  //       },
  //       plotOptions: {
  //         bar: {
  //           dataLabels: {
  //             enabled: true
  //           },
  //           colorByPoint: true
  //         },
  //       },
  //       credits: {
  //         enabled: false
  //       },
  //       series: [{
  //         type: 'column',
  //         name: 'Unemployed',
  //         colorByPoint: true,
  //         data: [],
  //         showInLegend: false
  //       }]
  //     };
  option: any = {
    title: {
      text: '',
      align: 'left'
    },
    colors: [
        '#0D2F4F',
        '#5A7287',
        '#95A3B2',
        '#B2BCC7'
    ],
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [{
        type: 'bar',
        name: 'Patient By Age',
        colorByPoint: true,
        data: [],
        showInLegend: false
    }]
  };
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {}
  
  protected renderChart(chartData: ChartApiResponse): void {
    const series = this.option.series;
    series[0].data = chartData.series;
    this.option = {
      ...this.option,
      title: {
        ...this.option.title,
        text: this.chartConfig.title 
      },
      yAxis: {
        ...this.option.yAxis,
        data: chartData.categories
      },
      series: [
        ...series
      ]
    }
    const chartEle = this.barChart.nativeElement;
    if (chartEle) {
      const chartRef = echarts.init(chartEle);
      chartRef.setOption({...this.option});
    }
  }
  private fetchChartData(url: string): void {
    this.showLoading = true;
    this.httpClient.get(url).subscribe((data: any) => {
      if (data) {
        this.renderChart(data);
        this.showLoading = false;
        this.errorMessage = null;
        return;
      }
      this.errorMessage = Messages.noData;
    },
    (error) => {
      this.errorMessage = Messages.errorFetchingData;
    })
  } 
}
