import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-type-page',
  imports: [CommonModule],
  templateUrl: './test-type-page.html',
  styleUrl: './test-type-page.css',
})
export class TestTypePage {

  readonly TEST_DURATION = 30;

  // Pool of words
  wordPool = [
    'time','speed','keyboard','angular','practice','typing','future','screen','mouse','system','random','design','project','simple','focus','learn','coding','result','developer','function','value','string','object','method','service','component','template','button','input','output','internet','browser','monitor','software','engine','science','school','energy',
    'people','computer','window','yellow','orange','planet','nature','garden','winter','summer','morning','evening','travel','market','family','friend','coffee','mobile','signal','network','memory','storage','banana','library','feature','student','teacher','chapter','testing','progress','beauty','mountain','success','problem','solution',
    'creative','history','freedom','culture','football','cricket','village','country','holiday','message','support','example','improve','quality','language','website','backend','frontend','database','correct','mistake','accuracy','performance','timer','challenge','technology','framework','typescript','javascript','modern','application','interface','responsive','security','efficient','powerful','education'
  ];

  generatedText = '';
  typedText = '';
  currentIndex = 0;

  timer = this.TEST_DURATION;
  timerInterval: any;

  isStarted = false;
  isFinished = false;

  correctCharacters = 0;

  constructor() {
    this.generateWords();
  }

  // Generate 50 random words
  generateWords() {
    this.generatedText = Array.from(
      { length: 50 },
      () => this.wordPool[
        Math.floor(Math.random() * this.wordPool.length)
      ]
    ).join(' ');
  }

  // Start timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  // Typing event
  onTyping(event: Event) {
    if (this.isFinished) return;

    const input = event.target as HTMLInputElement;

    this.typedText = input.value;
    this.currentIndex = this.typedText.length;

    // Start timer on first key press
    if (!this.isStarted && this.typedText.length) {
      this.isStarted = true;
      this.startTimer();
    }

    this.checkCorrectCharacters();
  }

  // Compare typed text
  checkCorrectCharacters() {
    this.correctCharacters = [...this.typedText]
      .filter((char, i) => char === this.generatedText[i])
      .length;
  }

  // Character styling
  getCharacterClass(index: number): string {

    if (index < this.typedText.length) {
      return this.typedText[index] === this.generatedText[index]
        ? 'correct'
        : 'wrong';
    }

    return index === this.currentIndex
      ? 'current'
      : '';
  }

  // Calculate WPM
  getWPM(): number {

    const timeSpent =
      (this.TEST_DURATION - this.timer) / 60;

    if (timeSpent <= 0) {
      return 0;
    }

    return Math.round(
      (this.correctCharacters / 5) /
      timeSpent
    );
  }

  // Accuracy
  getAccuracy(): number {

    if (!this.typedText.length) {
      return 100;
    }

    return Math.round(
      (this.correctCharacters /
        this.typedText.length) * 100
    );
  }

  // Finish test
  finishTest() {
    clearInterval(this.timerInterval);
    this.isFinished = true;
  }

  // Restart
  restartTest() {
    clearInterval(this.timerInterval);

    this.typedText = '';
    this.currentIndex = 0;
    this.timer = this.TEST_DURATION;

    this.isStarted = false;
    this.isFinished = false;
    this.correctCharacters = 0;

    this.generateWords();
  }
}