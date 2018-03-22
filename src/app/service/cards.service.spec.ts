import { TestBed, inject } from '@angular/core/testing';

import { CardsService } from './cards.service';
import {DECK} from '../data/card-deck';

describe('CardsService', () => {
    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardsService]
    });
  });

  it('should be created', inject([CardsService], (service: CardsService) => {
    expect(service).toBeTruthy();
  }));

  it('#getCards should return cards', inject([CardsService], (service: CardsService) => {
    expect(service.getCards()).toBe(DECK);
  }));
});
