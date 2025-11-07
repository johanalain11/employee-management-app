import { Component, Input, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  imports: [CommonModule],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard implements OnInit{

  @Input() name: string = '';
  @Input() count: number = 0;

  bgColor: string = '';

  ngOnInit() {
    this.bgColor = this.getRandomColor();
  }

  private getRandomColor(): string {
    const hue = 200 + Math.random() * 40;     // teinte entre 200° et 240°
    const saturation = 60 + Math.random() * 30; // saturation entre 60–90%
    const lightness = 30 + Math.random() * 40;  // luminosité entre 30–70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
