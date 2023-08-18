import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from 'src/environments/environment';

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
  // @ViewChild('doughnutChart', { static: false }) doughnutChart!: ElementRef<HTMLDivElement>;
  showLoading: boolean = false;
  errorMessage: string | null = null;
  Highcharts = Highcharts;
  totalSum: number = 0;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  options: any = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
      align: 'left'
    },
    subtitle: {
      text: '',
      align: 'left'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        center: ['40%', '30%'],
        size: '80%'
      }
    },
    tooltip: {
      enabled: true,
      style:{
        color: '#333333',
        cursor: 'default',
        fontSize: '12px',
        whiteSpace: 'nowrap',
      }
    },
    legend: {
      align: 'right',
      layout: 'vertical'
    },
    colors: ["#76ADDB", "#C8DB70", "#0B314F", "#999999", "#d96716"],
    series: [{
      name: '',
      innerSize: '50%',
      data: [],
      showInLegend: false
    }]
  }
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
            this.totalSum += response[key];
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
    let sum = this.totalSum;
    const series = this.options.series;
    series[0].data = chartData;
    this.options = {
      ...this.options,
      title: {
        ...this.options.title,
        text: this.chartConfig.title 
      },
      series: [
        ...series
      ],
      tooltip: {
        ...this.options.tooltip,
        formatter: function() {
          return '<b>' + this.point.name + '</b><br/> Count: ' + this.y + '<br/> Percentage: '+ ((this.y / sum)*100).toFixed(0) + '%';
        }
      }
    }
  }
}
