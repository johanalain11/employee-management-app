import { Component, OnInit } from '@angular/core';
import { EmployeeModel, APIResponseModel } from '../../models/employeeModel';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  employees: EmployeeModel[] = [];
  employeeCount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  getEmployees() : void {
    this.employeeService.getEmployees().subscribe({
      next: (response: APIResponseModel) => {
        this.employees = response.data;
      },
      error: () => {
        alert('Error while fetching the records!!');
      }
    })
  }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeCount = this.employees.length;
  }
}
