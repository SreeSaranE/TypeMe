import { Component } from '@angular/core';
import { Service } from '../../../core/service/service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-in-page',
  imports: [CommonModule],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css',
})
export class SignInPage {
  
  userName: string = ''
  userPassword: string = ''
  eMes: string = ''

  constructor(
    public service: Service,
    private router: Router
  ){}

  nameChange($e: Event){
    this.userName = ($e.target as HTMLInputElement).value;
  }

  passChange($e: Event){
    this.userPassword = ($e.target as HTMLInputElement).value;
  }
  
  onClick(){
    const success = this.service.loginUser(this.userName, this.userPassword)

    if(!success){
      
    }
    if(this.service.isLoggedIn()){
        this.router.navigate([''])
    }
  }

  signupPage(){
    this.service.alterLogin()
  }
}
