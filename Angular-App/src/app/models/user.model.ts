import { Team } from "./team.model";

export class User {
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public role: string;
    public teamId: Team;
    public primaryTask: string;
    public floatTask: string;

    constructor(_id: string, name: string, email: string, password: string, role: string, teamId: Team, primaryTask: string, floatTask: string) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.teamId = teamId;
        this.primaryTask = primaryTask;
        this.floatTask = floatTask;
    }
}