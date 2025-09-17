import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
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
