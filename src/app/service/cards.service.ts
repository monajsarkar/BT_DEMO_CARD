import { Injectable } from '@angular/core';
import {DECK} from '../data/card-deck';

@Injectable()
export class CardsService {

  constructor() { }
  
  getCards(){
    return DECK;
  }

}
