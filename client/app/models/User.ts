export class User {
    id: number;
    nickname: string;
    email: string;
    avatar: string;
    constructor(objBdd) {
        this.id = objBdd.id;
        this.nickname = objBdd.nickname;
        this.email = objBdd.email;
        this.avatar = `data:image/png;base64,${objBdd.avatar}`;
    }
}
