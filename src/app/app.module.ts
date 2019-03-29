import { CalculateTreesComponent } from './flight-calculator/calculate-trees/calculate-trees.component';
import { CalculateEmissionComponent } from './flight-calculator/calculate-emission/calculate-emission.component';
import { SelectFlightsComponent } from './flight-calculator/select-flights/select-flights.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CountUpModule } from 'countup.js-angular2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { FlightCalculatorComponent } from './flight-calculator/flight-calculator.component';
import { Co2InfoComponent } from './co2-info/co2-info.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForestComponent } from './forest/forest.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DonateComponent } from './donate/donate.component';
import { ShareButtonsModule } from '@ngx-share/buttons';



@NgModule({
   declarations: [
      AppComponent,
      MainComponent,
      NavComponent,
      FooterComponent,
      ContentComponent,
      FlightCalculatorComponent,
      Co2InfoComponent,
      ContactComponent,
      NotFoundComponent,
      ForestComponent,
      DonateComponent,
      ConfirmationComponent,
      SelectFlightsComponent,
      CalculateEmissionComponent,
      CalculateTreesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      FormsModule,
      HttpClientModule,
      CountUpModule,
      ShareButtonsModule,
      TypeaheadModule.forRoot(),
      CarouselModule.forRoot(),
      RatingModule.forRoot(),
      TooltipModule.forRoot(),
      RouterModule.forRoot(
        [
          {path: '', component: ContentComponent},
          {path: 'home', component: ContentComponent},
          {path: 'flight-calculator', component: FlightCalculatorComponent},
          {path: 'karbon-hesapla', component: FlightCalculatorComponent},
          {path: 'forest', component: ForestComponent},
          {path: 'climate-change', component: Co2InfoComponent},
          {path: 'kuresel-isinma', component: Co2InfoComponent},
          {path: 'contact', component: ContactComponent},
          {path: 'confirmation/:charity/:trees', component: ConfirmationComponent},
          {path: 'donate/:trees', component: DonateComponent},
          {path: '**', component: NotFoundComponent}
        ], {scrollPositionRestoration: 'enabled'}
      )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
