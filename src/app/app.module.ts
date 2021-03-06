import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CountUpModule } from 'countup.js-angular2';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { Co2InfoComponent } from './co2-info/co2-info.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DonateComponent } from './donate/donate.component';
import { Co2CalculateComponent } from './co2-calculate/co2-calculate.component';
import { DistanceCalculateComponent } from './distance-calculate/distance-calculate.component';
import { TreeCalculateComponent } from './tree-calculate/tree-calculate.component';
import { DonationService } from './services/donation.service';
import { DataApiService } from './services/data-api.service';


@NgModule({
   declarations: [
      AppComponent,
      MainComponent,
      NavComponent,
      FooterComponent,
      ContentComponent,
      Co2InfoComponent,
      ContactComponent,
      NotFoundComponent,
      DonateComponent,
      ConfirmationComponent,
      Co2CalculateComponent,
      DistanceCalculateComponent,
      TreeCalculateComponent
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
          {path: 'flight-calculator', component: DistanceCalculateComponent},
          {path: 'flight-calculator/from/:departure/to/:arrival', component: DistanceCalculateComponent},
          {path: 'flight-calculator/from/:departure/connection/:connection/to/:arrival', component: DistanceCalculateComponent},
          {path: 'ucus-hesapla', component: DistanceCalculateComponent},
          {path: 'ucus-hesapla/kalkis/:departure/varis/:arrival', component: DistanceCalculateComponent},
          {path: 'ucus-hesapla/kalkis/:departure/aktarma/:connection/varis/:arrival', component: DistanceCalculateComponent},
          {path: 'carbon-calculator/:distance', component: Co2CalculateComponent},
          {path: 'karbon-hesapla/:distance', component: Co2CalculateComponent},
          {path: 'calculate-trees/:carbon', component: TreeCalculateComponent},
          {path: 'agac-hesapla/:carbon', component: TreeCalculateComponent},
          {path: 'climate-change', component: Co2InfoComponent},
          {path: 'kuresel-isinma', component: Co2InfoComponent},
          {path: 'contact', component: ContactComponent},
          {path: 'confirmation/:charity/:trees', component: ConfirmationComponent},
          {path: 'donate/:trees', component: DonateComponent},
          {path: '**', component: NotFoundComponent}
        ], {scrollPositionRestoration: 'enabled'}
      )
   ],
   providers: [
     DonationService,
     DataApiService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
