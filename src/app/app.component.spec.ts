import { TestBed, async,ComponentFixture,fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { CardsComponent } from './cards/cards.component';
import { PicturecardPipe } from './service/picturecard.pipe';
import {CardsService} from './service/cards.service';
import {By} from '@angular/platform-browser';

class MockCardService {
 getCards(){
  return  [ {	number: 2, 	suit:'&clubs;', rank:1},{	number: 3, 	suit:'&spades;',rank:2},{	number: 4, 	suit:'&hearts;',rank:3}]
 }
};

describe('AppComponent', () => {
  let comp: AppComponent;
  let cardService: CardsService;
  let fixture : ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations:[AppComponent,CardsComponent,PicturecardPipe],
     
      providers:[{provide: CardsService, useClass: MockCardService }  ]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    cardService = TestBed.get(CardsService);
  });

  it('should create the app', async(() => {
   
    expect(comp).toBeTruthy();
  }));
  it(`should have as title 'World of Magic'`, async(() => {
        expect(comp.title).toEqual('World of Magic');
  }));
  

  it(`should NOT have any cards  before ngOnInit`, () => {
    expect(comp.deckOfcards.length).toBe(0, 'deckOfcards is empty before init');
  });

  it(`should get the cards after ngOnInit`, async(() => {
     fixture.detectChanges(); 
    expect(comp.deckOfcards.length).toBe(3, 'deckOfcards exists after init');
  }));


     
  it(`should shuffle the cards after shuffle button is clicked`, fakeAsync(() => {
    fixture.detectChanges(); 
    spyOn(comp, 'shuffle');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
   
    let orginalcards =  [ {	number: 2, 	suit:'&clubs;', rank:1},{	number: 3, 	suit:'&spades;',rank:2},{	number: 4, 	suit:'&hearts;',rank:3}];
  fixture.detectChanges();
   
      expect(comp.shuffle).toHaveBeenCalled();
    
  }));
  
});
