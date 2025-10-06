import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { APIResponseModel, EmployeeModel } from '../../models/employeeModel';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit{

  employees: EmployeeModel[] = [];
  employeeService = inject(EmployeeService);

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (response: APIResponseModel) => {
        this.employees = response.data;
      },
      error: () => {
        alert('Error while fetching the records!!');
      }
    })
  }

}
