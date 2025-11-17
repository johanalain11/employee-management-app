import { Component, inject, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [Navbar],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit {

  private router = inject(Router)

  constructor(private el: ElementRef) {}

  signin() {
    this.router.navigate(['./login']);
  }

  ngAfterViewInit(): void {
    this.checkAnimations();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkAnimations();
  }

  private checkAnimations() {
    const items = this.el.nativeElement.querySelectorAll('.animatable');

    items.forEach((element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const inView = rect.top + rect.height - 20 < window.innerHeight;

      if (inView && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.classList.remove('animatable');
      }
    });
  }

}
