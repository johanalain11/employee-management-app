import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Leaves } from './pages/leaves/leaves';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path:'',
    component:Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'employee',
        component: Employee
      },
      {
        path: 'leaves',
        component: Leaves
      }
    ]
  }
];
