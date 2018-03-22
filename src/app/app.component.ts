import { Component, OnInit } from '@angular/core';
import {CardsService} from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to Deck of Cards Magic!';
  count:number;
  deckOfcards:any =[];
  drawnCards:any =[];
  cardsLength:number;
  temporaryValue;
  randomIndex;

  constructor(
    public cardService: CardsService) {}
    
    ngOnInit(){
      this.getCards();
    }

  shuffle(){
    this.cardsLength = this.deckOfcards.length;
    while (0 !== this.cardsLength) {

      this.randomIndex = Math.floor(Math.random() * this.cardsLength);
      this.cardsLength -= 1;

      this.temporaryValue = this.deckOfcards[this.cardsLength];
      this.deckOfcards[this.cardsLength] = this.deckOfcards[this.randomIndex];
      this.deckOfcards[this.randomIndex] = this.temporaryValue;
    }


  }
  draw(){
    this.drawnCards.push.apply(this.drawnCards, this.deckOfcards.splice(0,this.count));
  }

  sort(){
    this.drawnCards.sort(function(card1,card2){
      if(card1.rank!= card2.rank)
        return card1.rank -card2.rank;
      else{
        return card2.number - card1.number;
      }  
    })
  }
  
  

  reset(){
   this.deckOfcards = this.drawnCards.concat(this.deckOfcards);
    this.drawnCards =[];
    this.count= undefined;
  }

  getCards(){
    this.deckOfcards = this.cardService.getCards();
  }

}
