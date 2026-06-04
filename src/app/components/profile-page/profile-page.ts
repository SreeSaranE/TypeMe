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
    private service: Service,
    private router: Router
  ){}

  logoutButton(){
    this.service.logout();
    this.router.navigate(['']);
  }

  deleteButton(){
    this.service.delete();
    this.router.navigate(['/login']);
  }
}
