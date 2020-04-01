import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { AppService } from '../../app.service';
import { Round } from '../../models/Round';
import { User } from '../../models/User';
import { RoundsService } from '../../services/rounds.service';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html'
})
export class MainboardComponent implements OnInit {
  public mh: User;
  public vv: User;
  public rounds: Round[];
  public query: string;

  constructor(private readonly appService: AppService, private readonly roundsService: RoundsService) {
    roundsService.getAll().subscribe(data => {
      this.rounds = data.map(element => new Round(element));
    });
    this.mh = this.appService.getPlayer1();
    this.vv = this.appService.getPlayer2();
  }

  public ngOnInit(): void {}

  public addRound(): void {
    swal({
      title: 'Add new round',
      showCancelButton: true,
      allowOutsideClick: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      html: `
              <h5>Title</h5>
              <input id='title' class='form-control'>
              <h5>Description</h5><textarea id='description' class='form-control'></textarea>
              <h5>Max Trigger</h5><input type='number' id='max-trigger' value='10' class='form-control'>
              <h5>Url Trophy Image</h5>
              <input id='url-image' value='' class='form-control'>
            `,
      focusConfirm: false,
      preConfirm: () =>
        new Promise(resolve => {
          resolve({
            title: (document.getElementById('title') as HTMLInputElement).value,
            description: (document.getElementById('description') as HTMLTextAreaElement).value,
            max_trigger: (document.getElementById('max-trigger') as HTMLInputElement).value,
            url_image: (document.getElementById('url-image') as HTMLInputElement).value
          });
        })
    })
      .then(result => {
        this.roundsService.add(result).subscribe(
          data => {
            this.rounds.unshift(new Round(data));
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
}
