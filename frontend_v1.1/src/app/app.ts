import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/service/theme/theme-service';
import { Navbar } from "./shared/components/navbar/navbar";
import { Footer } from "./shared/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend_v1.1');

  constructor(
    private readonly themeService: ThemeService
  ){}
}
