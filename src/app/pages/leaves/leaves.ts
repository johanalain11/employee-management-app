import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-leaves',
  imports: [ReactiveFormsModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves {

  @ViewChild("newModal") newModal!: ElementRef;

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null)
  })

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

}
