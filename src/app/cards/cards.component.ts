import { Component, OnInit , Input} from '@angular/core';
import {Card} from '../data/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() card: Card;
  constructor() { }

  ngOnInit() {
  }

}
