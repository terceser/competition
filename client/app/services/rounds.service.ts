import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRound, Round } from '../models/Round';
import { Trigger } from '../models/Trigger';
import { User } from '../models/User';

@Injectable()
export class RoundsService {
  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<IRound[]> {
    return this.http.get<IRound[]>('/api/rounds');
  }

  public add(round: Round): Observable<IRound> {
    round.author = { id: Number(localStorage.getItem('user_id')) } as User;

    return this.http.post<IRound>('/api/rounds', round);
  }

  public get(idRound: number): Observable<IRound> {
    return this.http.get<IRound>(`/api/rounds/${idRound}`);
  }

  public addTrigger(trigger: Trigger, idRound: number): Observable<IRound> {
    trigger.author = { id: Number(localStorage.getItem('user_id')) } as User;

    return this.http.post<IRound>(`/api/rounds/${idRound}/triggers`, trigger);
  }

  public update(idRound: number, data: Partial<Round>): Observable<IRound> {
    return this.http.put<IRound>(`/api/rounds/${idRound}`, data);
  }
}
