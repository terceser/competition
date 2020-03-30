import { ITrigger, Trigger } from './Trigger';
import { User } from './User';

export class Round {
  public id: number;
  public title: string;
  public description: string;
  public url_image: string;
  public max_trigger: number;
  public id_winner: number;
  public triggers: Trigger[];
  public winner: User;
  public author: User;

  constructor(objBdd: IRound) {
    this.id = objBdd.id;
    this.title = objBdd.title;
    this.description = objBdd.description;
    this.max_trigger = objBdd.max_trigger > 0 ? objBdd.max_trigger : 1;
    this.author = new User({ id: objBdd.id_author, nickname: undefined, email: undefined, avatar: undefined });
    this.id_winner = objBdd.id_winner;
    this.url_image = '/assets/img/trophy.png';
    if (objBdd.url_image) {
      this.url_image = objBdd.url_image;
    }
    if (objBdd.author) {
      this.author = new User(objBdd.author);
    }
    if (objBdd.winner) {
      this.winner = new User(objBdd.winner);
    }
    this.triggers = objBdd.triggers.map(t => new Trigger(t));
  }
}

export interface IRound {
  id: number;
  title: string;
  description: string;
  url_image: string;
  max_trigger: number;
  id_winner: number;
  id_author: number;
  triggers: ITrigger[];
  winner: User;
  author: User;
}
