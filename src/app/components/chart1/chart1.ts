import { Component, ViewChild, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart1',
  imports: [NgApexchartsModule],
  templateUrl: './chart1.html',
  styleUrl: './chart1.css'
})
export class Chart1 implements OnChanges{

  @ViewChild("chart") chart = new ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() employeeNumber: number = 0;
  @Input() leaveNumber: number = 0;

  constructor() {
    this.chartOptions = this.initChartOptions();
  }

  private initChartOptions(): Partial<ChartOptions> {
    return {
      series: [
        {
          name: "Employees",
          data: [0, this.employeeNumber]
        },
        {
          name: "Leaves",
          data: [0, this.leaveNumber]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: [
          "01-01-2025",
          "Today"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeNumber'] || changes['leaveNumber']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartOptions.series = [
      {
        name: "Employees",
        data: [0, this.employeeNumber]
      },
      {
        name: "Leaves",
        data: [0, this.leaveNumber]
      }
    ];
  }

  public generateData(baseval: any, count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
