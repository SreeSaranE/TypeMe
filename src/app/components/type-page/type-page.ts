import { 
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../core/service/stats-service';


@Component({
  selector: 'app-type-page',
  imports: [CommonModule],
  templateUrl: './type-page.html',
  styleUrl: './type-page.css',
})
export class TypePage implements AfterViewInit {

  ngAfterViewInit(): void {
        this.typingInput.nativeElement.focus();
    }
  
    readonly TEST_DURATION = 60;
  readonly WORD_COUNT = 50;

  wordPool = [
    'time','speed','keyboard','angular','practice','typing','future','screen', 'mouse','system','random','design','project','simple','focus','learn',
    'coding','result','developer','function','value','string','object', 'method','service','component','template','button','input','output',
    'internet','browser','monitor','software','engine','science', 'school','energy','people','computer','window','yellow','orange','planet','nature',
    'garden','winter','summer','morning','evening', 'travel','market','family','friend','coffee','mobile','signal','network','memory','storage',
    'banana','library','feature','student', 'teacher','chapter','testing','progress','beauty','mountain','success','problem','solution','creative',
    'history','freedom', 'culture','football','cricket','village','country','holiday',
    'message','support','example','improve','quality','language', 'website','backend','frontend','database','correct','mistake',
    'accuracy','performance','timer','challenge','technology', 'framework','typescript','javascript','modern','application',
    'interface','responsive','security','efficient','powerful', 'education'
  ];

  @ViewChild('typingInput')
  typingInput!: ElementRef<HTMLInputElement>;

  words: string[] = [];
  generatedText = '';

  typedText = '';
  currentIndex = 0;

  timer = this.TEST_DURATION;
  timerInterval: any;

  isStarted = false;
  isFinished = false;

  correctCharacters = 0;

  constructor(private statsService: StatsService) {
    this.generateWords();
  }

  //--------------------------------------------------

  generateWords() {
    this.words = Array.from(
      { length: this.WORD_COUNT },
      () => this.getRandomWord()
    );

    this.generatedText = this.words.join(' ');
  }

  private getRandomWord(): string {
    return this.wordPool[
      Math.floor(Math.random() * this.wordPool.length)
    ];
  }

  //--------------------------------------------------

  onTyping(event: Event) {
    if (this.isFinished) {
      return;
    }

    const input = event.target as HTMLInputElement;

    this.typedText = input.value;
    this.currentIndex = this.typedText.length;

    if (!this.isStarted && this.typedText.length) {
      this.isStarted = true;
      this.startTimer();
    }

    this.checkCorrectCharacters();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  finishTest() {
    this.clearTimer();
    this.isFinished = true;

    this.saveStats();
  }

  //--------------------------------------------------

  private saveStats() {
    this.statsService.addStats(
      Math.floor(Date.now() / 1000),
      this.getWPM(),
      this.getAccuracy()
    );
  }

  checkCorrectCharacters() {
    this.correctCharacters = [...this.typedText]
      .filter((char, i) => char === this.generatedText[i])
      .length;
  }

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

  /**
   * Converts word index + character index
   * into index inside generatedText
   */
  getGlobalIndex(
    wordIndex: number,
    charIndex: number
  ): number {
    let index = 0;

    for (let i = 0; i < wordIndex; i++) {
      index += this.words[i].length + 1; // space
    }

    return index + charIndex;
  }

  //--------------------------------------------------

  getWPM(): number {
    const timeSpent =
      (this.TEST_DURATION - this.timer) / 60;

    return timeSpent <= 0
      ? 0
      : Math.round(
          (this.correctCharacters / 5) / timeSpent
        );
  }

  getAccuracy(): number {
    return !this.typedText.length
      ? 100
      : Math.round(
          (this.correctCharacters /
            this.typedText.length) * 100
        );
  }

  //--------------------------------------------------

  restartTest() {
    this.clearTimer();
    this.resetState();
    this.generateWords();
  }

  //--------------------------------------------------

  private clearTimer() {
    clearInterval(this.timerInterval);
  }

  private resetState() {
    this.typedText = '';
    this.currentIndex = 0;
    this.timer = this.TEST_DURATION;

    this.isStarted = false;
    this.isFinished = false;
    this.correctCharacters = 0;
  }
}
