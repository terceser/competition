import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MainboardComponent } from './components/mainboard/mainboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoundComponent } from './components/round/round.component';
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
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
