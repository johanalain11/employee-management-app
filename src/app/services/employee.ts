import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}
