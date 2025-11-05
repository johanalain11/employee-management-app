import { DashboardCard } from './../../components/dashboard-card/dashboard-card';
import { Component, OnInit } from '@angular/core';
import { EmployeeModel, APIResponseModel } from '../../models/employeeModel';
import { EmployeeService } from '../../services/employee';
import { LeaveModel } from '../../models/leaveModel';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  employees: EmployeeModel[] = [];
  employeeId: number = 0;
  leaveList: LeaveModel[] = [];
  employeeCount: number = 0;
  leaveCount: number = 0;
  leavePendingCount: number = 0;
  leaveApprovedCount: number = 0;

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
        this.employeeCount = this.employees.length;
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
        this.leaveCount = this.leaveList.length;
        console.log(this.leaveCount);
        this.leavePendingCount = this.leaveList.filter(leave => !leave.isApproved).length;
        console.log(this.leavePendingCount);
        this.leaveApprovedCount = this.leaveList.filter(leave => leave.isApproved).length;
        console.log(this.leaveApprovedCount);
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
