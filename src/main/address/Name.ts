export class Name {

    public readonly firstname: string;
    public readonly lastname: string;

    constructor(firstname: string, lastname: string) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    get fullname(): string {
        return `-${this.firstname} ${this.lastname}-`;
    }
}
