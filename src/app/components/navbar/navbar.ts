import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  private router = inject(Router)
  @ViewChild('menu') menu!: ElementRef;
  showMenu = false;
  ngOnInit() { this.showMenu = false; }
  signin() {
    this.router.navigate(['./login']);
  }

  toggleMenu() {
    if(this.menu) {
      const display = this.menu.nativeElement.style.display;
      this.menu.nativeElement.style.display = display === 'block' ? 'none' : 'block';
      this.showMenu = !this.showMenu;
    }
  }
}
