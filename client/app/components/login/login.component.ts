import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../../app.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginscreen = true;
    test: Date = new Date();
    loading = false;
    model: any = {};
    returnUrl: string;
    error: string;
    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService) {
        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit() { }

    login() {
        this.loading = true;
        this.authService.login(this.model.email, this.model.password).subscribe(data => {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('user_id', data.user.id);
            localStorage.setItem('token', data.token);
            this.appService.refreshUser().then(() => {
                this.router.navigate([this.returnUrl]);
                this.loading = false;
            }
            ).catch(error => {
                this.loading = false;
                alert(error);
            })
        }, err => {
            this.loading = false;
            this.error = 'LOGIN/PASSWORD INCORRECT'
        })

    }
}
