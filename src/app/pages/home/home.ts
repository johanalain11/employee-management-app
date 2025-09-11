import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero'

@Component({
  selector: 'app-home',
  imports: [Navbar, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
