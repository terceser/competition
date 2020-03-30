import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { Trigger } from '../../models/Trigger';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit, OnDestroy {
  public mh: User;
  public vv: User;
  public round: Round;

  private readonly sub: Subscription;

  constructor(
    private readonly appService: AppService,
    private readonly route: ActivatedRoute,
    private readonly roundsService: RoundsService
  ) {
    this.mh = this.appService.getPlayer1();
    this.vv = this.appService.getPlayer2();
    this.sub = this.route.params
      .pipe(
        switchMap(params => this.roundsService.get(params.id)),
        tap(round => {
          this.round = new Round(round);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public changeImage(round: Round): void {
    swal({
      title: 'Update Trophy Image',
      showCancelButton: true,
      allowOutsideClick: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      html: `<h5>Url Image</h5><input id='urlimage' class='form-control'>`,
      focusConfirm: false,
      preConfirm: () =>
        new Promise(resolve => {
          resolve({
            urlimage: (document.getElementById('urlimage') as HTMLInputElement).value
          });
        })
    })
      .then(result => {
        const dataPost = { url_image: result.urlimage };
        this.roundsService.update(round.id, dataPost).subscribe(
          data => {
            this.round.url_image = data.url_image;

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

  public addTrigger(user: User): void {
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
        const trigger = new Trigger({
          comment: result.comment,
          id: undefined,
          created_date: undefined,
          source: undefined,
          author: undefined
        });
        trigger.source = user;
        this.roundsService.addTrigger(trigger, this.round.id).subscribe(
          data => {
            this.round.triggers.push(trigger);
            swal({
              type: 'success'
            });
          },
          error => {
            swal({
              type: 'error'
            });
          }
        );
      })
      .catch(error => {
        swal({
          type: 'error'
        });
      });
  }

  public getTrigger(user: User): Trigger[] {
    return this.round.triggers.filter(trig => trig.source.id === user.id);
  }

  public getDateFr(date: Date): string {
    return date.toLocaleDateString('fr');
  }

  public getTimeFr(date: Date): string {
    const time = date.toLocaleTimeString('fr');

    return time.substring(0, time.length - 3);
  }

  public getAvatar(user: User): string {
    return this.appService.users.find(u => u.id === user.id).avatar;
  }
}
