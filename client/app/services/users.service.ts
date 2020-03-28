import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/User';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    get(id) {
        return this.http.get<User>('/api/users/' + id);
    }
}
