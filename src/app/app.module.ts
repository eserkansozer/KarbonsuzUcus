import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

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
      ForestComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      FormsModule,
      HttpClientModule,
      TypeaheadModule.forRoot(),
      RouterModule.forRoot(
        [
          {path: '', component: ContentComponent},
          {path: 'home', component: ContentComponent},
          {path: 'flight-calculator', component: FlightCalculatorComponent},
          {path: 'forest', component: ForestComponent},
          {path: 'about', component: Co2InfoComponent},
          {path: 'contact', component: ContactComponent},
          {path: '**', component: NotFoundComponent}
        ]
      )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
