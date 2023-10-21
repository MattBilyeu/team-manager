export class Escalation {
    public title: string;
    public notes: string[];
    public stage: string;
    public owner: string

    constructor(title: string, note: string[], stage: string, ownerId: string) {
        this.title = title;
        this.notes = note;
        this.stage = stage;
        this.owner = ownerId;
    }
}