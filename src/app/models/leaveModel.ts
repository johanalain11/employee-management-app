export interface LeaveModel {
  leaveId: number
  employeeId: number
  fromDate: string
  toDate: string
  noOfDays: number
  leaveType: string
  details: string
  isApproved: boolean
  approvedDate: string
}

export class LeaveClass {
  details: string;
  employeeId: number;
  fromDate: string;
  leaveId: number;
  leaveType: string;
  noOfDays: number;
  toDate: string;
  approvedDate: string;
  isApproved: boolean;

  constructor() {
    this.details = '';
    this.employeeId = 0;
    this.fromDate = '';
    this.leaveId = 0;
    this.leaveType = '';
    this.noOfDays = 0;
    this.toDate = '';
    this.approvedDate = '';
    this.isApproved = false;
  }
}
