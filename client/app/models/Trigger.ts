import { IUser, User } from './User';

export class Trigger {
  public id: number;
  public createdDate: Date;
  public comment: string;
  public source: User;
  public author: User;

  constructor(objBdd: ITrigger) {
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

export interface ITrigger {
  id: number;
  created_date: string;
  comment: string;
  source: IUser;
  author: IUser;
}
