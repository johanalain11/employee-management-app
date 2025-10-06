export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface EmployeeModel {
  employeeId: number;
  employeeName: string;
  deptId: string;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
}
