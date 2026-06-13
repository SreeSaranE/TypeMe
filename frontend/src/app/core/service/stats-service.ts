import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';

export interface UserStat {
  id: number;
  username: string;
  wpm: number;
  accuracy: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  userStats = signal<UserStat[]>([]);

  private readonly apiUrl = 'http://localhost:3000/stats';

  constructor(
    private service: Service,
    private http: HttpClient
  ) {

    effect(() => {

      const username = this.service.loggedUserName();

      if (username) {
        this.loadStats();
      } else {
        this.userStats.set([]);
      }

    });

  }

  //--------------------------------------------------

  addStats(wpm: number, accuracy: number) {

  const username = this.service.loggedUserName();

  console.log('Username:', username);
  console.log('Sending:', {
    username,
    wpm,
    accuracy
  });

  this.http.post(this.apiUrl, {
    username,
    wpm,
    accuracy
  }).subscribe({
    next: (res) => {
      console.log('Saved successfully:', res);
      this.loadStats();
    },
    error: (err) => {
      console.error('POST failed:', err);
    }
  });

}

  //--------------------------------------------------

  loadStats() {

    const username = this.service.loggedUserName();

    if (!username) return;

    this.http
      .get<UserStat[]>(`${this.apiUrl}/${username}`)
      .subscribe({
        next: (data) => this.userStats.set(data),
        error: (err) => console.error('Failed to load stats:', err)
      });

  }

  //--------------------------------------------------

  resetStats() {

    const username = this.service.loggedUserName();

    if (!username) return;

    this.http
      .delete(`${this.apiUrl}/${username}`)
      .subscribe({
        next: () => this.userStats.set([]),
        error: (err) => console.error('Failed to delete stats:', err)
      });

  }
}