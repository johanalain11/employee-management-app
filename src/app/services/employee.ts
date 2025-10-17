import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { APIResponseModel } from '../models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  constructor(private http: HttpClient) { }

  onLogin(data: any) {
    return this.http.post(`${this.baseUrl}/Login`, data);
  }

  getEmployees(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.baseUrl}/GetEmployees`);
  }

  getDepartments() {
    return this.http.get(`${this.baseUrl}/GetDepartments`).pipe(
      map((response: any) => response.data)
    );
  }

  getRoles(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/GetAllRoles`).pipe(
      map((response: any) => response.data)
    );
  }

  addEmployee(obj: any) {
    return this.http.post(`${this.baseUrl}/CreateEmployee`, obj)
  }

  getAllLeavesByEmployeeId(empId: number) {
    return this.http.get(`${this.baseUrl}/GetAllLeavesByEmployeeId?id=${empId}`).pipe(
      map((response: any) => response.data)
    );
  }

  addLeave(obj: any) {
    return this.http.post(`${this.baseUrl}/AddLeave`, obj);
  }

}
