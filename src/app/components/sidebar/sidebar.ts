import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  router = inject(Router);
  logOff() {
    localStorage.removeItem('leaveUser');
    this.router.navigate(['/login']);
  }
  goHome() {
    this.router.navigate(['/']);
  }

  currentDropdown: string | null = null;
  currentSubDropdown: string | null = null;

  toggleDropdown(name: string) {
    if (this.currentDropdown === name) {
      this.currentDropdown = null;
      this.currentSubDropdown = null; // ferme aussi les sous-dropdowns
    } else {
      this.currentDropdown = name;
      this.currentSubDropdown = null;
    }
  }

  isOpen(name: string): boolean {
    return this.currentDropdown === name;
  }

  toggleSubDropdown(name: string) {
    if (this.currentSubDropdown === name) {
      this.currentSubDropdown = null;
    } else {
      this.currentSubDropdown = name;
    }
  }

  isSubOpen(name: string): boolean {
    return this.currentSubDropdown === name;
  }
}
