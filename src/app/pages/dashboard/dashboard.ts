import { DashboardCard } from './../../components/dashboard-card/dashboard-card';
import { Component, OnInit, signal } from '@angular/core';
import { EmployeeModel, APIResponseModel } from '../../models/employeeModel';
import { EmployeeService } from '../../services/employee';
import { LeaveModel } from '../../models/leaveModel';
import { Chart1 } from '../../components/chart1/chart1';
import { Chart2 } from '../../components/chart2/chart2';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard, Chart1, Chart2],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  employees: EmployeeModel[] = [];
  employeeId: number = 0;
  leaveList: LeaveModel[] = [];
  employeeCount = signal<number>(0);
  leaveCount = signal<number>(0);
  leavePendingCount = signal<number>(0);
  leaveApprovedCount = signal<number>(0);

  constructor(private employeeService: EmployeeService) {
    debugger;
    const loggedData = localStorage.getItem('leaveUser');
    if(loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.employeeId = loggedParseData.employeeId;
    }
  }

  getEmployees() : void {
    this.employeeService.getEmployees().subscribe({
      next: (response: APIResponseModel) => {
        this.employees = response.data;
        this.employeeCount.set(this.employees.length);
      },
      error: () => {
        alert('Error while fetching the records!!');
      }
    })
  }

  getLeaves(): void {
    this.employeeService.getAllLeavesByEmployeeId(this.employeeId).subscribe({
      next: (response: any) => {
        this.leaveList = response;
        console.log("Leave List:", this.leaveList);
        this.leaveCount.set(this.leaveList.length);
        console.log(this.leaveCount());
        this.leavePendingCount.set(this.leaveList.filter(leave => !leave.isApproved).length);
        console.log(this.leavePendingCount());
        this.leaveApprovedCount.set(this.leaveList.filter(leave => leave.isApproved).length);
        console.log(this.leaveApprovedCount());
      },
      error: () => {
        alert('Error while fetching the records!!');
      }
    })
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getLeaves();
  }
}
