export class Team {
    public name: string;
    public updates: object[];
    public tips: object[];
    public escalations: object[];
    public users: string[];

    constructor(name: string, updates: object[], tips: object[], escalations: object[], users: string[]) {
        this.name = name;
        this.updates = updates;
        this.tips = tips;
        this.escalations = escalations;
        this.users = users
    }
}