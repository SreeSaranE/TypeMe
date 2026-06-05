import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { Service } from '../../core/service/service';
import { StatsService } from '../../core/service/stats-service';

@Component({
  selector: 'app-stats-page',
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.css',
})
export class StatsPage {

  constructor(
    public service: Service,
    public statsService: StatsService
  ) {}

  statsArray = computed(() => {

    const stats = this.statsService.userStats();

    return Object.entries(stats)
      .map(([timestamp, values]) => {

        const [wpm, accuracy] = values;

        return {
          timestamp: Number(timestamp),
          date: this.formatDate(Number(timestamp)),
          wpm,
          accuracy
        };
      })

      // newest first
      .sort((a, b) => b.timestamp - a.timestamp);
  });

  formatDate(timestamp: number): string {

    const date = new Date(timestamp * 1000);

    return date.toLocaleString();
  }
}