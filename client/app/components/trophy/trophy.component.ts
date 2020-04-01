import { Component } from '@angular/core';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html'
})
export class TrophyComponent {
  public mh: User;
  public vv: User;
  public trophy: Round[];
  public loading: boolean = false;

  constructor(private readonly appService: AppService, private readonly roundsService: RoundsService) {
    this.mh = this.appService.getPlayer1();
    this.vv = this.appService.getPlayer2();
    this.roundsService.getAll().subscribe(data => {
      this.trophy = [];
      data.forEach(el => {
        if (el.id_winner) {
          this.trophy.unshift(new Round(el));
        }
      });
    });
  }

  public getTrophy(user: User): Round[] {
    return this.trophy.filter(tro => tro.id_winner === user.id);
  }
}
