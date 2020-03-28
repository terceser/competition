
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { UsersService } from './services/users.service';
import { environment } from '../environments/environment';


@Injectable()
export class AppService {
    users: User[];
    isLogin = false;
    unique: number;
    constructor(private usersService: UsersService) {
        if (localStorage.getItem('token') != null) {
            this.refreshUser();
        } else {
            this.isLogin = true;
        }
    }

    refreshUser() {
        return new Promise((resolve, reject) => {
            this.usersService.getAll().subscribe(data => {
                this.users = [];
                data.forEach(u => {
                    this.users.push(new User(u));
                })
                resolve();
            },
                error => {
                    console.log(error);
                    reject(error);
                })
        });
    }

    getPlayer1() {
        return this.users.find(u => u.nickname === environment.player1);
    }

    getPlayer2() {
        return this.users.find(u => u.nickname === environment.player2);
    }
}
