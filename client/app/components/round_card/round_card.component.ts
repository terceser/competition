import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { Trigger } from '../../models/Trigger';
import { User } from '../../models/User';

declare var $: any;

@Component({
    selector: 'app-roundcard',
    templateUrl: './round_card.component.html'
})

export class RoundCardComponent implements OnInit {
    @Input() round: any;
    public mh: User;
    public vv: User;
    constructor(private router: Router, private appService: AppService, private zone: NgZone) {
        this.mh = this.appService.getPlayer1();
        this.vv = this.appService.getPlayer2();
    }

    ngOnInit() {
        window['round' + this.round.id] = { component: this, zone: this.zone };
    }


    addTrigger(event, round, vv) {
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
            const cmp = window['round' + round.id].component;
            window['round' + round.id].zone.run(() => {
                const user = vv ? cmp.vv : cmp.mh;

                const trigger = new Trigger({ comment: result.comment });

                trigger.source = user;
                cmp.roundsService.addTrigger(trigger, round.id)
                    .subscribe(data => {
                        if (data.id_winner) {
                            cmp.round = new Round(data);
                        } else {
                            cmp.round.triggers.push(trigger);
                        }
                        cmp.loading = false;
                        swal({
                            type: 'success',
                        })
                    }, error => swal({
                        type: 'error',
                    }))
            });
        }).catch(error => {
            const cmp = window['round' + round.id].component;
            window['round' + round.id].zone.run(() => {
                cmp.loading = false;
            });
        });
        event.stopPropagation(); // stop propagation
    }

    isPhoneOrTablet() {
        return window.innerWidth <= 785
    }

    getTrigger(round, user) {
        return round.triggers.filter(trig =>  trig.source.id === user.id );
    }

    getWinner(round) {
        if (round.id_winner) {
            return round.id_winner === this.mh.id ? this.mh : this.vv;
        }

        return null;
    }

    goToRound(round) {
        this.router.navigate(['round', round.id])
    }
}
