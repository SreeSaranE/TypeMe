import { Injectable, signal, effect} from '@angular/core';
import { Service } from './service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  userStats = signal<Record<number, [number, number]>>({});
  
  constructor(
    private service: Service
  ){
    effect(() => {
      const userName = service.loggedUserName();

      console.log(userName);
      
      if (userName){
        this.loadStatus()
      }else{
        this.userStats.set({})
      }
    })   
  }

  //--------------------------------------------------

  addStats(timeStamp:number, wpm: number, accuracy: number){

    this.userStats.update(data => ({...data, [timeStamp]: [wpm, accuracy]}) )

    const userName = this.service.loggedUserName();
    const data = localStorage.getItem(userName)

    if(data){
      const user = JSON.parse(data);
      const userPassword = user.userPassword
      
      const storeData = {
        ...user,
        'userStats': this.userStats()
      }
      localStorage.setItem(userName, JSON.stringify(storeData))
    }
  }

  loadStatus(){
    const userName = this.service.loggedUserName();
    const data = localStorage.getItem(userName);

    if (data) {
      const user = JSON.parse(data);
      if (user.userStats){
        this.userStats.set(user.userStats);   
      }
    }
  }
}