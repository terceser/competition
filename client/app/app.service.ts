import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { User } from './models/User';
import { UsersService } from './services/users.service';

@Injectable()
export class AppService {
  public users: User[];
  public isLogin: boolean = false;
  public unique: number;

  constructor(private readonly usersService: UsersService) {
    if (localStorage.getItem('token') != null) {
      this.refreshUser();
    } else {
      this.isLogin = true;
    }
  }

  public refreshUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usersService.getAll().subscribe(
        data => {
          this.users = [];
          data.forEach(u => {
            this.users.push(new User(u));
          });
          resolve();
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  public getPlayer1(): User {
    return this.users.find(u => u.nickname === environment.player1);
  }

  public getPlayer2(): User {
    return this.users.find(u => u.nickname === environment.player2);
  }
}
