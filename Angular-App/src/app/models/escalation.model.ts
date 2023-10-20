export class Escalation {
    public title: string;
    public note: string[];
    public stage: string;
    public owner: string

    constructor(title: string, note: string[], stage: string, ownerId: string) {
        this.title = title;
        this.note = note;
        this.stage = stage;
        this.owner = ownerId;
    }
}