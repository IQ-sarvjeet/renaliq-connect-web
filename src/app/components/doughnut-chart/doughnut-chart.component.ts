import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from 'src/environments/environment';
import { ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

type BarChartConfig = {
  apiUrl: string;
  title: string;
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {
  @ViewChild('doughnutChart', { static: false }) doughnutChart!: ElementRef<HTMLDivElement>;
  showLoading: boolean = false;
  errorMessage: string | null = null;
  Highcharts = Highcharts;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  // options: any = {
  //   chart: {
  //     type: 'pie',
  //   },
  //   title: {
  //     text: '',
  //     align: 'left'
  //   },
  //   subtitle: {
  //     text: '',
  //     align: 'left'
  //   },
  //   plotOptions: {
  //     pie: {
  //       dataLabels: {
  //         enabled: false,
  //         style: {
  //           fontWeight: 'bold',
  //           color: 'black'
  //         }
  //       },
  //       center: ['35%', '55%'],
  //       size: '130%'
  //     }
  //   },
  //   tooltip: {
  //     enabled: true,
  //     style:{
  //       color: '#333333',
  //       cursor: 'default',
  //       fontSize: '12px',
  //       whiteSpace: 'nowrap',
  //     }
  //   },
  //   legend: {
  //     align: 'right',
  //     layout: 'vertical'
  //   },
  //   colors: ["#76ADDB", "#C8DB70", "#0B314F", "#999999", "#d96716"],
  //   series: [{
  //     name: '',
  //     innerSize: '50%',
  //     data: [],
  //     showInLegend: true
  //   }]
  // }
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit() {}
  private fetchChartData(url: string): void {
    this.showLoading = true;
    this.httpClient.get(`${environment.baseApiUrl}/api/${url}`).subscribe({
      next: (response: any) => {
        if (response) {
          const gridData: any = [];
          Object.keys(response).forEach((key: string) => {
            gridData.push([key, response[key]]);
          })
          this.renderChart(gridData);
          this.showLoading = false;
          this.errorMessage = null;
          return;
        }
        this.errorMessage = Messages.noData;
      },
      error: (error) => {
        this.showLoading = false;
        this.errorMessage = Messages.errorFetchingData;
      }
    })
  }
  private renderChart(chartData: any): void {
    // const series = this.options.series;
    // series[0].data = chartData;
    // this.options = {
    //   ...this.options,
    //   title: {
    //     ...this.options.title,
    //     text: this.chartConfig.title 
    //   },
    //   series: [
    //     ...series
    //   ]
    // }




    const chartEle = this.doughnutChart.nativeElement;
    if (chartEle) {
      console.log('chartEle:::', chartEle);
      const chartRef = echarts.init(chartEle);
      let option: EChartsOption;
      option = {
        color: ["#083050", "#46647c", "#8397a7", "#ced6dc", "#2684ff"],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          right: '5%',
          width: '30%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            left: '-50%',
            data: chartData,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
          }
        ]
      };

      option && chartRef.setOption(option);
    }
  }
}
