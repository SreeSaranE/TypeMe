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
import { StatsService } from '../../core/service/stats-service';

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
      this.statsArray();

      queueMicrotask(() => {
        this.renderCharts();
      });
    });
  }

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
      .sort((a, b) => a.timestamp - b.timestamp);
  });

  bestWpm = computed(() => {

    const stats = this.statsArray();

    if (!stats.length) return 0;

    return Math.max(...stats.map(s => s.wpm));
  });

  averageWpm = computed(() => {

    const stats = this.statsArray();

    if (!stats.length) return 0;

    return Math.round(
      stats.reduce((sum, s) => sum + s.wpm, 0) / stats.length
    );
  });

  totalTests = computed(() => this.statsArray().length);

  formatDate(timestamp: number): string {

    return new Date(timestamp * 1000)
      .toLocaleDateString();
  }

  renderCharts() {

    if (!this.wpmCanvas || !this.accuracyCanvas) {
      return;
    }

    const stats = this.statsArray();

    if (!stats.length) {
      return;
    }

    const labels = stats.map(s => s.date);

    this.wpmChart?.destroy();
    this.accuracyChart?.destroy();

    this.wpmChart = new Chart(
      this.wpmCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'WPM',
              data: stats.map(s => s.wpm),
              borderColor: '#4f46e5',
              tension: 0.3,
              fill: true,
              
            }
          ]
        }
      }
    );

    this.accuracyChart = new Chart(
      this.accuracyCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Accuracy (%)',
              data: stats.map(s => s.accuracy),
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