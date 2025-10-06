import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/loginModel';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [LoginModel]
})
export class Login {
  private router = inject(Router);
  employeeService = inject(EmployeeService);

  home() {
    this.router.navigate(['/']);
  }
  loginObj: LoginModel = new LoginModel();
  login() {
    this.employeeService.onLogin(this.loginObj).subscribe({
      next:(result: any) => {
        if (result.result) {
          localStorage.setItem('leaveUser', JSON.stringify(result.data));
          this.router.navigate(['/dashboard']);
        }
        else {
          alert(result.message);
        }
      },
      error:(err: any) => {
        alert('API Error');
      }
    })

  }

}
