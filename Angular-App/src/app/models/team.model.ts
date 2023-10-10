import { Escalation } from "./escalation.model";

interface Update {
    category: string,
    text: string,
    acknowledged: string[]
  }

export class Team {
    public _id: string;
    public name: string;
    public updates: Update[];
    public tips: {category: string, text: string}[];
    public escalations: Escalation[];
    public users: string[];

    constructor( _id: string, name: string, updates: Update[], tips: {category: string, text: string}[], escalations: Escalation[], users: string[]) {
        this._id = _id;
        this.name = name;
        this.updates = updates;
        this.tips = tips;
        this.escalations = escalations;
        this.users = users
    }
}