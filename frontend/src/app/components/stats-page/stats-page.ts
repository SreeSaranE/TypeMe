import {
  Component,
  computed,
  effect,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { Chart } from 'chart.js/auto';

import { Service } from '../../core/service/service';
import {
  StatsService,
  UserStat
} from '../../core/service/stats-service';

@Component({
  selector: 'app-stats-page',
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.css',
})
export class StatsPage {

  @ViewChild('wpmChart')
  wpmCanvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('accuracyChart')
  accuracyCanvas!: ElementRef<HTMLCanvasElement>;

  wpmChart?: Chart;
  accuracyChart?: Chart;

  constructor(
    public service: Service,
    public statsService: StatsService
  ) {

    effect(() => {

      // Track changes in stats
      this.statsArray();

      queueMicrotask(() => {
        this.renderCharts();
      });

    });

  }

  //--------------------------------------------------
  // Convert backend data into UI-friendly format

  statsArray = computed(() => {

    return this.statsService.userStats()
      .map((stat: UserStat) => ({

        id: stat.id,

        created_at: stat.created_at,

        date: this.formatDate(stat.created_at),

        wpm: stat.wpm,

        accuracy: stat.accuracy

      }))
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );

  });

  //--------------------------------------------------

  bestWpm = computed(() => {

    const stats = this.statsArray();

    if (!stats.length) {
      return 0;
    }

    return Math.max(
      ...stats.map(stat => stat.wpm)
    );

  });

  //--------------------------------------------------

  averageWpm = computed(() => {

    const stats = this.statsArray();

    if (!stats.length) {
      return 0;
    }

    return Math.round(

      stats.reduce(
        (sum, stat) => sum + stat.wpm,
        0
      ) / stats.length

    );

  });

  //--------------------------------------------------

  totalTests = computed(() =>
    this.statsArray().length
  );

  //--------------------------------------------------

  formatDate(dateString: string): string {

    return new Date(dateString)
      .toLocaleDateString();

  }

  //--------------------------------------------------

  renderCharts() {

    if (!this.wpmCanvas || !this.accuracyCanvas) {
      return;
    }

    const stats = this.statsArray();

    if (!stats.length) {

      this.wpmChart?.destroy();
      this.accuracyChart?.destroy();

      return;
    }

    const labels = stats.map(stat => stat.date);

    this.wpmChart?.destroy();
    this.accuracyChart?.destroy();

    //--------------------------------------------------
    // WPM Chart

    this.wpmChart = new Chart(
      this.wpmCanvas.nativeElement,
      {
        type: 'line',

        data: {

          labels,

          datasets: [
            {
              label: 'WPM',

              data: stats.map(
                stat => stat.wpm
              ),

              borderColor: '#4f46e5',

              tension: 0.3,

              fill: true
            }
          ]
        }
      }
    );

    //--------------------------------------------------
    // Accuracy Chart

    this.accuracyChart = new Chart(
      this.accuracyCanvas.nativeElement,
      {
        type: 'line',

        data: {

          labels,

          datasets: [
            {
              label: 'Accuracy (%)',

              data: stats.map(
                stat => stat.accuracy
              ),

              borderColor: '#16a34a',

              tension: 0.3,

              fill: true
            }
          ]
        }
      }
    );

  }

}