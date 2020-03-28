import { Trigger } from './Trigger';
import { User } from './User';
export class Round {
    id: number;
    title: string;
    description: string;
    url_image: string;
    max_trigger: number;
    id_winner: number;
    triggers: Trigger[];
    winner: User;
    author: User;
    constructor(objBdd) {
        this.id = objBdd.id;
        this.title = objBdd.title;
        this.description = objBdd.description;
        this.max_trigger = objBdd.max_trigger > 0 ? objBdd.max_trigger : 1;
        this.author = new User({ id: objBdd.id_author });
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
        this.triggers = [];
        if (objBdd.triggers) {
            objBdd.triggers.forEach(hisBdd => {
                this.triggers.push(new Trigger(hisBdd));
            }
            )
        }
    }
}
