export class User {
  public id: number;
  public nickname: string;
  public email: string;
  public avatar: string;
  
  constructor(objBdd: IUser) {
    this.id = objBdd.id;
    this.nickname = objBdd.nickname;
    this.email = objBdd.email;
    this.avatar = `data:image/png;base64,${objBdd.avatar}`;
  }
}

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  avatar: string;
}
