import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { MainboardComponent } from './components/mainboard/mainboard.component';
import { RoundComponent } from './components/round/round.component';
import { AuthGuard } from '../guards/auth.guard';
import { TrophyComponent } from './components/trophy/trophy.component';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'mainboard', canActivate: [AuthGuard], component: MainboardComponent },
  { path: 'round/:id', canActivate: [AuthGuard], component: RoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'landing', canActivate: [AuthGuard], component: LandingComponent },
  { path: 'trophy', canActivate: [AuthGuard], component: TrophyComponent },
  { path: '', redirectTo: 'mainboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
