import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {

  loggedUserName = signal<string>('')
  isLoggedIn = signal<boolean>(false);
  showLoginPage = signal<boolean>(true);

  errorMessage = signal<string>('')

  constructor(){

    const userStatus = localStorage.getItem('loginStatus')

    if(userStatus){
      const status = JSON.parse(userStatus)

      this.isLoggedIn.set(status.loginStatus)
      this.loggedUserName.set(status.userName || '')
    }
  }

  //--------------------------------------------------

  alterLogin(){
    this.showLoginPage.update(value => !value);
  }

  //--------------------------------------------------

  setOk(userName: string, userPassword: string, loginStatus: boolean){
    const storeData = {
      userName,
      userPassword,
      loginStatus
    }
    localStorage.setItem(userName, JSON.stringify(storeData))

    const storeStatus = {
      userName,
      loginStatus
    }
    localStorage.setItem('loginStatus', JSON.stringify(storeStatus))
    this.isLoggedIn.set(loginStatus);
    this.loggedUserName.set(userName)
  }

  //--------------------------------------------------
  loginUser(userName: string, userPassword: string){

    const data = localStorage.getItem(userName);

    if(!data){
      return "No user found!";
    }else{
      const user = JSON.parse(data); 

      if (userPassword === user.userPassword){
        this.setOk(userName, userPassword, true)
        return ''
      }else{
        return "Password incorrect!";
      }
    }
  }

  //--------------------------------------------------

  signupUser(userName: string, userPassword: string){

    const data = localStorage.getItem(userName);

    if(!data){
      this.setOk(userName, userPassword, true)
      return ''
    }else{
      return "User already present!"
    }
  }
  
  //--------------------------------------------------

  logout(){
    this.isLoggedIn.set(false);

    const storeStatus = {
      userName: '',
      loginStatus: false
    }
    localStorage.setItem('loginStatus', JSON.stringify(storeStatus))

    this.loggedUserName.set('');
    this.showLoginPage.set(true);
  }

  delete(){
    localStorage.removeItem(this.loggedUserName());
    this.logout();
  }
}
