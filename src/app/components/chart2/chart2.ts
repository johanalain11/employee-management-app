import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-chart2',
  imports: [NgApexchartsModule],
  templateUrl: './chart2.html',
  styleUrl: './chart2.css'
})

export class Chart2 implements OnChanges{
  @ViewChild("chart") chart = new ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() leaveNumber: number = 0;
  @Input() leavesApprovedNumber: number = 0;
  @Input() leavesPendingNumber: number = 0;

  constructor() {
    this.chartOptions = this.initChartOptions();
  }

  private initChartOptions(): Partial<ChartOptions> {
    return {
      series: [this.leaveNumber, this.leavesApprovedNumber, this.leavesPendingNumber],
      chart: {
        height: 350,
        type: "radialBar"
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px",
              formatter: (w) => {
                return w.toString();
              }
            },
            total: {
              show: true,
              label: "Total",
              formatter: () => {
                return this.leaveNumber.toString();
              }
            }
          }
        }
      },
      labels: ["Total Leaves", "Approved Leaves", "Pending Leaves"]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leaveNumber'] || changes['leavesApprovedNumber'] || changes['leavesPendingNumber']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartOptions.series = [this.leaveNumber, this.leavesApprovedNumber, this.leavesPendingNumber];
  }
}
