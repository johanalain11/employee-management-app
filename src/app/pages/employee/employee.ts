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
  showModal = false;

  employees: EmployeeModel[] = [];
  employeeService = inject(EmployeeService);

  employeeObj = new EmployeeClass();

  @ViewChild("newModal") newModal!: ElementRef;
  deptList$: Observable<any[]> = new Observable<any[]>();
  roleList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit() {
    this.getEmployees();
    this.deptList$ = this.employeeService.getDepartments();
    this.roleList$ = this.employeeService.getRoles();
    this.showModal = false;
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
      this.showModal = true;
    }
  }

  closeModal() {
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "none";
      this.showModal = false;
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
    this.employeeObj.emailId = employee.emailId;
    this.employeeObj.deptId = Number(employee.deptId);
    this.employeeObj.password = '';
    this.employeeObj.gender = employee.gender;
    this.employeeObj.role = employee.role;
  }

  onEditEmployee() {
    this.employeeService.updateEmployee(this.employeeObj).subscribe({
      next:(res:any)=>{
        if(res.result) {
          alert("Employee Updated Success")
          this.closeModal();
          this.getEmployees();
        } else {
          alert(res.message)
        }
      },
        error:()=>{
        alert('Error while updating employee!');
      }
    })
  }

  onDeleteEmployee(empId: number, empName: string) {
    if(confirm(`Are you sure to delete employee: ${empName} ?`)) {
      this.employeeService.deleteEmployee(empId).subscribe({
        next:(res:any)=>{
          if(res.result) {
            alert("Employee Deleted Success")
            this.getEmployees();
          } else {
            alert(res.message)
          }
        },
          error:()=>{
          alert('Error while deleting employee!');
        }
      })
    }
  }

}
