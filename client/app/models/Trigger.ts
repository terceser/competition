import { User } from './User';

export class Trigger {
    id: number;
    createdDate: Date;
    comment: string;
    source: User;
    constructor(objBdd) {
        this.id = objBdd.id;
        if (objBdd.created_date) {
            this.createdDate = new Date(objBdd.created_date);
        }
        this.comment = objBdd.comment;
        if (objBdd.source) {
            this.source = new User(objBdd.source);
        }
    }
}
