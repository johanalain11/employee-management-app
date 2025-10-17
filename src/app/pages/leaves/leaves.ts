import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { EmployeeService } from '../../services/employee';
import { Loader } from '../../components/loader/loader';
import { LeaveClass, LeaveModel } from '../../models/leaveModel';
import { APIResponseModel } from '../../models/employeeModel';

@Component({
  selector: 'app-leaves',
  imports: [ReactiveFormsModule, Loader],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves implements OnInit{

  @ViewChild("newModal") newModal!: ElementRef;
  employeeService = inject(EmployeeService);

  leaveList: LeaveModel[] = [];

  ngOnInit() {
    this.loadLeaves();
  }

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(new Date()),
  })

  constructor() {
    debugger;
    const loggedData = localStorage.getItem('leaveUser');
    if(loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId);
    }
  }

  openModal() {
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "block";
    }
  }

  closeModal() {
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "none";
    }
  }

  loadLeaves() {
    const empId = this.leaveForm.controls['employeeId'].value;
    this.employeeService.getAllLeavesByEmployeeId(empId).subscribe({
      next: (response: any) => {
        this.leaveList = response;
      },
      error: () => {
        alert('Error while fetching the records!!');
      }
    })
  }

  onSaveLeave() {
    const formValue: LeaveClass = this.leaveForm.value;
    this.employeeService.addLeave(formValue).subscribe({
      next: (res:any) => {
        if(res.result) {
          alert('Leave Added Successfully');
          this.closeModal();
          this.loadLeaves();
        } else {
          alert(res.message);
          console.log(res);
        }
      },
      error: () => {
        alert('Error while adding leave!');
      }
    })
  }

}
