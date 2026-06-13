import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Service } from '../../core/service/service';
import { RouterLink, RouterOutlet , RouterLinkWithHref} from '@angular/router';
import { TypePage } from "../type-page/type-page";

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, RouterLinkWithHref, TypePage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  constructor(
    public service: Service
  ) {}
}