export class Device {

    constructor(clientID: string, name: string, functions: any, topics: string[], users: string[]){
        this.clientID = clientID;
        this.name = name;
        this.functions = functions;
        this.topics = topics;
        this.users = users;
    }

    clientID: string;
    name: string;
    functions: any;
    topics: string[];
    users: string[];
}
