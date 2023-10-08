import { Escalation } from "./escalation.model";

export class Team {
    public _id: string;
    public name: string;
    public updates: object[];
    public tips: object[];
    public escalations: Escalation[];
    public users: string[];

    constructor( _id: string, name: string, updates: object[], tips: object[], escalations: Escalation[], users: string[]) {
        this._id = _id;
        this.name = name;
        this.updates = updates;
        this.tips = tips;
        this.escalations = escalations;
        this.users = users
    }
}