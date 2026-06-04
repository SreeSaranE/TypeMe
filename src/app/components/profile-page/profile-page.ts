import { Component } from '@angular/core';
import { Service } from '../../core/service/service';
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
    private router: Router
  ){}

  //--------------------------------------------------

  logoutButton(){
    const confirmed = confirm(
      'Waring: This will logout your current account and you have to login again.'
    )
    if (confirmed) {
      this.confirmLogout()
    }
  }

  confirmLogout(){
    this.service.logout();
    this.router.navigate(['']);
  }

  //--------------------------------------------------

  resetButton(){
     const confirmed = confirm(
      'Warning: This will permanently reset you stats.'
     )
  }

  confirmReset(){
    console.log("Reset"); 
  }

  //--------------------------------------------------

  deleteButton(){
    const confirmed = confirm(
      'Warning: This will permanently delete your account and all associated data. This action cannot be undone.'
    );

    if (confirmed) {
      this.confirmDelete();
    }
  }

  confirmDelete(){
    this.service.delete();
    this.router.navigate(['/login']);
  }
}
