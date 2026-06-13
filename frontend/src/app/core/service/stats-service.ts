import { Injectable, signal, effect } from '@angular/core';
import { Service } from './service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  userStats = signal<Record<number, [number, number]>>({});

  constructor(private service: Service) {
    effect(() => {
      this.service.loggedUserName()
        ? this.loadStatus()
        : this.userStats.set({});
    });
  }

  //--------------------------------------------------

  addStats(timeStamp: number, wpm: number, accuracy: number) {
    this.userStats.update(data => ({
      ...data,
      [timeStamp]: [wpm, accuracy],
    }));

    this.saveStats();
  }

  loadStatus() {
    const user = this.getUserData();

    this.userStats.set(user?.userStats ?? {});
  }

  resetStats() {
    this.userStats.set({});
    this.saveStats();
  }

  //--------------------------------------------------
  // Reusable functions

  private getUserData() {
    const userName = this.service.loggedUserName();
    const data = localStorage.getItem(userName);

    return data ? JSON.parse(data) : null;
  }

  private saveStats() {
    const userName = this.service.loggedUserName();
    const user = this.getUserData();

    if (!user) return;

    localStorage.setItem(
      userName,
      JSON.stringify({
        ...user,
        userStats: this.userStats(),
      })
    );
  }
}