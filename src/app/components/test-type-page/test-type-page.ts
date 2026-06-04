import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test-type-page',
  imports: [CommonModule],
  templateUrl: './test-type-page.html',
  styleUrl: './test-type-page.css',
})
export class TestTypePage {
    targetText: string =
    'The quick brown fox jumps over the lazy dog';

  typedText: string = '';

  mistakes: number = 0;

  isFinished: boolean = false;

  handleTyping(event: Event): void {

    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Reset mistakes every time user types
    this.mistakes = 0;

    this.typedText = value;

    // Check for mistakes
    for (let i = 0; i < value.length; i++) {

      if (value[i] !== this.targetText[i]) {
        this.mistakes++;
      }

    }

    // Check if typing finished
    this.isFinished =
      value.length === this.targetText.length;

  }

}