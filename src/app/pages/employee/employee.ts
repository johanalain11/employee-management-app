import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { APIResponseModel, EmployeeClass, EmployeeModel } from '../../models/employeeModel';
import { Loader } from '../../components/loader/loader';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [Loader, AsyncPipe, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit{

  modalTitle = '';

  employees: EmployeeModel[] = [];
  employeeService = inject(EmployeeService);

  employeeObj = new EmployeeClass();

  @ViewChild("newModal") newModal!: ElementRef;
  @ViewChild("tableContainer") tableContainer!: ElementRef;
  deptList$: Observable<any[]> = new Observable<any[]>();
  roleList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit() {
    this.getEmployees();
    this.deptList$ = this.employeeService.getDepartments();
    this.roleList$ = this.employeeService.getRoles();
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

  openModal(title: string) {
    this.modalTitle = title;
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "block";
      this.tableContainer.nativeElement.style.opacity = "0.5";
    }
  }

  closeModal() {
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "none";
      this.tableContainer.nativeElement.style.opacity = "1";
    }
  }

  onAddEmployee() {
    this.employeeService.addEmployee(this.employeeObj).subscribe({
      next:(res:any)=>{
        if(res.result) {
          alert("Employee Created Success")
          this.closeModal();
          this.getEmployees();
        } else {
          alert(res.message)
        }
      },
        error:()=>{
        alert('Error while adding employee!');
      }
    })
  }

  onUpdateEmployee(employee: EmployeeModel) {
    this.openModal('Edit');

    this.employeeObj.employeeId = employee.employeeId;
    this.employeeObj.employeeName = employee.employeeName;
    this.employeeObj.contactNo = employee.contactNo;
    this.employeeObj.deptId = Number(employee.deptId);
    this.employeeObj.emailId = employee.emailId;
    this.employeeObj.gender = employee.gender;
    this.employeeObj.role = employee.role;
    this.employeeObj.gender = 'Male';

    // To be implemented
  }

  onEditEmployee() {}

  onDeleteEmployee(empId: number) {

  }

}
