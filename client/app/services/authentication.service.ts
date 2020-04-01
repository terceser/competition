import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): Observable<{ user: { id: string }; token: string }> {
    return this.http.post<{ user: { id: string }; token: string }>('/login', { email: email, password: password });
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
  }
}
