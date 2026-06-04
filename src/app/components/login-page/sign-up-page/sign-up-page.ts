import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../core/service/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  imports: [CommonModule],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {

  constructor(
    private router: Router,
    private service: Service
    ){}

  userName: string = '';
  userPassword: string = '';
  errorMessage: string = ''

  nameChange($e: Event){
    this.userName = ($e.target as HTMLInputElement).value;
  }

  passChange($e: Event){
    this.userPassword = ($e.target as HTMLInputElement).value;
  }

  addUser(){
    if(this.userName && this.userPassword){
      this.errorMessage = this.service.signupUser(this.userName, this.userPassword)
      if(this.service.isLoggedIn()){
        this.router.navigate([''])
      }
    }else{
      this.errorMessage = 'Enter valid Details'
    }
    
  }

  loginPage(){
    this.service.alterLogin()
  }
}

