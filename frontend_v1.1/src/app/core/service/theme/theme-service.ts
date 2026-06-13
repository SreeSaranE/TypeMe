import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private mediaQuery: MediaQueryList;

  private themeSubject = new BehaviorSubject<Theme>('light');

  readonly theme$: Observable<Theme> =
    this.themeSubject.asObservable();

  constructor() {
    console.log('ThemeService initialized');

    this.mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    this.applyTheme(
      this.mediaQuery.matches
        ? 'dark'
        : 'light'
    );

    this.mediaQuery.addEventListener(
      'change',
      this.handleSystemThemeChange
    );
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  private handleSystemThemeChange = (
    event: MediaQueryListEvent
  ): void => {

    const theme: Theme =
      event.matches
        ? 'dark'
        : 'light';

    this.applyTheme(theme);
  };

  private applyTheme(theme: Theme): void {

    document.documentElement.classList.remove(
      'light-theme',
      'dark-theme'
    );

    document.documentElement.classList.add(
      `${theme}-theme`
    );

    this.themeSubject.next(theme);
  }

  destroy(): void {
    this.mediaQuery.removeEventListener(
      'change',
      this.handleSystemThemeChange
    );
  }
}
