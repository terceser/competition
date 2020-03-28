import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Round } from '../models/Round';

@Injectable()
export class RoundsService {
    rounds: Round[];
    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<any>('/api/rounds');
    }

    add(round) {
        round.author = { id: localStorage.getItem('user_id') };
        return this.http.post<any>('/api/rounds', round);
    }

    get(idRound) {
        return this.http.get<any>('/api/rounds/' + idRound);
    }

    addTrigger(trigger, idRound) {
        trigger.author = { id: localStorage.getItem('user_id') };
        return this.http.post<any>('/api/rounds/' + idRound + '/triggers', trigger);
    }

    getTrophy(): any {
        return Observable.create(observer => {
            const trophyForUser = this.rounds.filter(r => {
                return r.winner != null
            })
            observer.next(trophyForUser);
            observer.complete();
        })
    }

    update(idRound, data) {
        return this.http.put<any>('/api/rounds/' + idRound, data);
    }
}
