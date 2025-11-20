import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { EmployeeService } from '../../services/employee';
import { Loader } from '../../components/loader/loader';
import { LeaveClass, LeaveModel } from '../../models/leaveModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leaves',
  imports: [ReactiveFormsModule, Loader, DatePipe],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves implements OnInit{

  @ViewChild("newModal") newModal!: ElementRef;
  showModal = false;

  employeeService = inject(EmployeeService);

  leaveList: LeaveModel[] = [];
  leaveApprovalList: any[] = [];

  ngOnInit() {
    this.loadLeaves();
    this.loadLeaveApprovals();
    this.showModal = false;
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
    approvedDate: new FormControl(''),
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
      this.showModal = true;
    }
  }

  closeModal() {
    if(this.newModal) {
      this.newModal.nativeElement.style.display = "none";
      this.showModal = false;
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

  loadLeaveApprovals() {
    const empId = this.leaveForm.controls['employeeId'].value;
    this.employeeService.getLeavesForApprovalBySupervisorId(empId).subscribe({
      next: (response: any) => {
        this.leaveApprovalList = response;
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
          console.log(formValue)
          console.log(res);
        }
      },
      error: () => {
        alert('Error while adding leave!');
      }
    })
  }

  approveLeave(leaveId: number) {
    this.employeeService.approveLeave(leaveId).subscribe({
      next: (res:any) => {
        if(res.result) {
          alert('Leave Approved Successfully');
          this.loadLeaves();
        } else {
          alert(res.message);
          console.log(res);
        }
      },
      error: () => {
        alert('Error while approving leave!');
      }
    })
  }

  rejectLeave(leaveId: number) {
    this.employeeService.rejectLeave(leaveId).subscribe({
      next: (res:any) => {
        if(res.result) {
          alert('Leave Rejected Successfully');
          this.loadLeaves();
        } else {
          alert(res.message);
          console.log(res);
        }
      },
      error: () => {
        alert('Error while rejecting leave!');
      }
    })
  }

}
