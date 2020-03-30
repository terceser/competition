import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from '../guards/auth.guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppService } from './app.service';
import { HomeModule } from './components/home/home.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MainboardComponent } from './components/mainboard/mainboard.component';
import { SearchPipe } from './components/mainboard/mainboard.search.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { RoundComponent } from './components/round/round.component';
import { RoundCardComponent } from './components/round_card/round_card.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TrophyComponent } from './components/trophy/trophy.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { RoundsService } from './services/rounds.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    MainboardComponent,
    RoundComponent,
    ProfileComponent,
    NavbarComponent,
    TrophyComponent,
    RoundCardComponent,
    SearchPipe
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule, FormsModule, RouterModule, HomeModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AppService,
    AuthGuard,
    AuthenticationService,
    RoundsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
