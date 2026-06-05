import { Component } from '@angular/core';
import { Service } from '../../core/service/service';
import { StatsService } from '../../core/service/stats-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  constructor(
    public service: Service,
    private statsService: StatsService,
    private router: Router
  ) {}

  //--------------------------------------------------

  logoutButton() {
    this.showConfirm(
      'Warning: This will logout your current account and you have to login again.',
      () => {
        this.service.logout();
        this.router.navigate(['']);
      }
    );
  }

  resetButton() {
    this.showConfirm(
      'Warning: This will permanently reset your stats.',
      () => this.statsService.resetStats()
    );
  }

  deleteButton() {
    this.showConfirm(
      'Warning: This will permanently delete your account and all associated data. This action cannot be undone.',
      () => {
        this.service.deleteUser();
        this.router.navigate(['/login']);
      }
    );
  }

  //--------------------------------------------------
  // Reusable function

  private showConfirm(message: string, action: () => void) {
    if (confirm(message)) {
      action();
    }
  }
}