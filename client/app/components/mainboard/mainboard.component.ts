import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

declare var $: any;

@Component({
    selector: 'app-mainboard',
    templateUrl: './mainboard.component.html'
})


export class MainboardComponent implements OnInit {
    public mh: User;
    public vv: User;
    public rounds: Round[];
    loading: false;
    query: string;
    constructor(private router: Router, private appService: AppService, private roundsService: RoundsService, private zone: NgZone) {
        roundsService.getAll().subscribe(data => {
            this.rounds = [];
            data.forEach(element => {
                this.rounds.push(new Round(element));
            });
        }
        );
        this.mh = appService.getPlayer1();
        this.vv = appService.getPlayer2();
        window['mainboard'] = { component: this, zone: zone };
    }

    ngOnInit() {
    }

    addRound() {
        swal({
            title: 'Add new round',
            showCancelButton: true,
            allowOutsideClick: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            html:
                `
                    <h5>Title</h5>
                    <input id='title' class='form-control'>
                    <h5>Description</h5><textarea id='description' class='form-control'></textarea>
                    <h5>Max Trigger</h5><input type='number' id='max-trigger' value='10' class='form-control'>
                    <h5>Url Trophy Image</h5>
                    <input id='url-image' value='' class='form-control'>
                `,
            focusConfirm: false,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve({
                        title: $('#title').val(),
                        description: $('#description').val(),
                        max_trigger: $('#max-trigger').val(),
                        url_image: $('#url-image').val()
                    })
                })
            }
        }).then(function (result) {
            const cmp = window['mainboard'].component;
            window['mainboard'].zone.run(() => {
                cmp.roundsService.add(result)
                    .subscribe(data => {
                        cmp.rounds.unshift(new Round(data));
                        cmp.loading = false;
                        swal({
                            type: 'success',
                        })
                    }, error => swal({
                        type: 'error',
                    }))
            });
        }).catch(error => {
            const cmp = window['mainboard'].component;
            window['mainboard'].zone.run(() => {
                cmp.loading = false;
                swal({
                    type: 'error',
                });
            });
        });
    }

    delete(event, round) {
        event.stopPropagation(); // stop propagation
    }
}
