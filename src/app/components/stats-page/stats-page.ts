import { Component } from '@angular/core';
import { Service } from '../../core/service/service';
import { RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'app-stats-page',
  imports: [ RouterLinkWithHref,],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.css',
})
export class StatsPage {

  constructor(
    public service: Service,
    
  ){}
}
