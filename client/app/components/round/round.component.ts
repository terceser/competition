import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { Trigger } from '../../models/Trigger';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

declare var $: any;

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html'
})

export class RoundComponent implements OnInit {
    private sub: Subscription;
    mh: User;
    vv: User;
    round: Round;
    loading = false;
    constructor(private appService: AppService,
        private route: ActivatedRoute, private roundsService: RoundsService, private zone: NgZone) {
        this.mh = this.appService.getPlayer1();
        this.vv = this.appService.getPlayer2();
        this.sub = this.route.params.subscribe(
            params => {
                this.roundsService.get(params.id).subscribe(data => {
                    this.round = new Round(data);
                })
            });
        window['round'] = { component: this, zone: this.zone };
    }

    ngOnInit() {
    }

    changeImage(round) {
        swal({
            title: 'Update Trophy Image',
            showCancelButton: true,
            allowOutsideClick: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            html:
                `<h5>Url Image</h5><input id='urlimage' class='form-control'>`,
            focusConfirm: false,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve({
                        urlimage: $('#urlimage').val()
                    })
                })
            }
        }).then(function (result) {
            const cmp = window['round'].component;
            window['round'].zone.run(() => {
                const dataPost = { url_image: result.urlimage };
                cmp.roundsService.update(round.id, dataPost)
                    .subscribe(data => {
                        cmp.round.url_image = data.url_image;
                        cmp.loading = false;
                        swal({
                            type: 'success',
                        })
                    }, error => swal({
                        type: 'error',
                    }))
            });
        }).catch(error => {
            const cmp = window['round'].component;
            window['round'].zone.run(() => {
                cmp.loading = false;
            });
        });
        event.stopPropagation(); // stop propagation
    }


    addTrigger(user) {
        swal({
            title: 'Add new trigger',
            showCancelButton: true,
            allowOutsideClick: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            html:
                `<h5>Comment</h5><input id='comment' class='form-control'>`,
            focusConfirm: false,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve({
                        comment: $('#comment').val()
                    })
                })
            }
        }).then(function (result) {
            const cmp = window['round'].component;
            window['round'].zone.run(() => {
                const trigger = new Trigger({ comment: result.comment });
                trigger.source = user;
                cmp.roundsService.addTrigger(trigger, cmp.round.id)
                    .subscribe(data => {
                        cmp.round.triggers.push(trigger);
                        cmp.loading = false;
                        swal({
                            type: 'success',
                        })
                    }).catch(error => {
                        swal({
                            type: 'error',
                        });
                    })
            });
        }).catch(error => {
            const cmp = window['round'].component;
            window['round'].zone.run(() => {
                cmp.loading = false;
                swal({
                    type: 'error',
                });
            });
        });
    }

    getTrigger(user) {
        return this.round.triggers.filter(trig => trig.source.id === user.id);
    }

    getDateFr(date: Date) {
        return date.toLocaleDateString('fr');
    }

    getTimeFr(date: Date) {
        const time = date.toLocaleTimeString('fr');
        return time.substring(0, time.length - 3);
    }

    getAvatar(user) {
        return this.appService.users.find(u => u.id === user.id).avatar;
    }

}
