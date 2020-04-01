import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../../app.service';
import { AuthenticationService } from '../../services/authentication.service';

export interface ILogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public model: ILogin = {
    email: undefined,
    password: undefined
  };
  public returnUrl: string;
  public error: string;

  constructor(
    private readonly appService: AppService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public ngOnInit(): void {}

  public login(): void {
    this.loading = true;
    this.authService.login(this.model.email, this.model.password).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('token', data.token);
        this.appService
          .refreshUser()
          .then(() => {
            this.router.navigate([this.returnUrl]);
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            alert(error);
          });
      },
      err => {
        this.loading = false;
        this.error = 'LOGIN/PASSWORD INCORRECT';
      }
    );
  }
}
