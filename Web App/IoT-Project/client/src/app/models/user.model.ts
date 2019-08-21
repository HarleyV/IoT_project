export class User {

    constructor(uid: string, email: string){
        this.uid = uid;
        this.email = email;
    }

    uid: string;
    email: string;
    devices: string[];
}
