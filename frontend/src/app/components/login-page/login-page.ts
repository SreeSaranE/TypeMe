import { Component } from '@angular/core';
import { SignInPage } from "./sign-in-page/sign-in-page";
import { SignUpPage } from './sign-up-page/sign-up-page';
import { Service } from '../../core/service/service';

@Component({
  selector: 'app-login-page',
  imports: [SignInPage, SignUpPage],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  constructor(public service: Service){

  }

}