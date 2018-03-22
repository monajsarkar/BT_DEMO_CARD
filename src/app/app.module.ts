import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { PicturecardPipe } from './service/picturecard.pipe';
import {CardsService} from './service/cards.service';
import { MockPipe } from './test/mock.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    PicturecardPipe,
    MockPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
