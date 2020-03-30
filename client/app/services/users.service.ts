import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser, User } from '../models/User';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.http.get<IUser[]>('/api/users').pipe(map(users => users.map(u => new User(u))));
  }

  public get(id: number): Observable<User> {
    return this.http.get<IUser>(`/api/users/${id}`).pipe(map(u => new User(u)));
  }
}
