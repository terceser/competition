import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from './app.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(NavbarComponent, { static: false }) public navbar: NavbarComponent;

  private _router: Subscription;

  constructor(
    private readonly appService: AppService,
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private readonly element: ElementRef,
    public readonly location: Location
  ) {}

  public ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
        this.navbar.sidebarClose();
      }
    });
    this.renderer.listen('window', 'scroll', event => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.add('navbar-transparent');
      }
    });
  }

  public ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  public isLoggedIn(): boolean {
    return this.appService.isLogin;
  }

  public getUsers(): User[] {
    return this.appService.users;
  }
}
