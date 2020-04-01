import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { Trigger } from '../../models/Trigger';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

@Component({
  selector: 'app-roundcard',
  templateUrl: './round_card.component.html'
})
export class RoundCardComponent implements OnInit {
  @Input() public round: Round;
  public mh: User;
  public vv: User;
  constructor(
    private readonly router: Router,
    private readonly appService: AppService,
    private readonly roundsService: RoundsService
  ) {
    this.mh = this.appService.getPlayer1();
    this.vv = this.appService.getPlayer2();
  }

  public ngOnInit(): void {}

  public addTrigger(round: Round, vv: boolean): void {
    swal({
      title: 'Add new trigger',
      showCancelButton: true,
      allowOutsideClick: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      html: `<h5>Comment</h5><input id='comment' class='form-control'>`,
      focusConfirm: false,
      preConfirm: () =>
        new Promise(resolve => {
          resolve({
            comment: (document.getElementById('comment') as HTMLInputElement).value
          });
        })
    })
      .then(result => {
        const user = vv ? this.vv : this.mh;

        const trigger = new Trigger({
          comment: result.comment,
          id: undefined,
          created_date: undefined,
          source: undefined,
          author: undefined
        });

        trigger.source = user;
        this.roundsService.addTrigger(trigger, round.id).subscribe(
          data => {
            if (data.id_winner) {
              this.round = new Round(data);
            } else {
              this.round.triggers.push(trigger);
            }

            swal({
              type: 'success'
            });
          },
          error =>
            swal({
              type: 'error'
            })
        );
      })
      .catch(error => {
        swal({
          type: 'error'
        });
      });
  }

  public isPhoneOrTablet(): boolean {
    return window.innerWidth <= 785;
  }

  public getTrigger(round: Round, user: User): Trigger[] {
    return round.triggers.filter(trig => trig.source.id === user.id);
  }

  public getWinner(round: Round): User {
    if (round.id_winner) {
      return round.id_winner === this.mh.id ? this.mh : this.vv;
    }

    return null;
  }

  public goToRound(round: Round): void {
    this.router.navigate(['round', round.id]);
  }
}
