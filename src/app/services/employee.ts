import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Employee {

  constructor(private http: HttpClient) { }

  onLogin(data: any) {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login', data);
  }

}
