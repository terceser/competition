import { Component, NgZone, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

@Component({
    selector: 'app-trophy',
    templateUrl: './trophy.component.html'
})

export class TrophyComponent implements OnInit {
    mh: User;
    vv: User;
    trophy: Round[];
    loading = false;
    constructor(private appService: AppService, private roundsService: RoundsService, private zone: NgZone) {
        this.mh = this.appService.getPlayer1();
        this.vv = this.appService.getPlayer2();
        this.roundsService.getAll().subscribe(data => {
            this.trophy = [];
            console.log(data);
            data.forEach(el => {
                if (el.id_winner) {
                    this.trophy.unshift(new Round(el));
                }
            })
        })
        window['trophy'] = { component: this, zone: this.zone };
    }

    getTrophy(user: User) {
        return this.trophy.filter(tro => tro.id_winner === user.id
        )
    }

    ngOnInit() {
    }
}
