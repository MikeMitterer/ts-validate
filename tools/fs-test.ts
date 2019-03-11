/* tslint:disable:no-console */
import * as console from 'console';
import * as fs from 'fs';
import * as process from 'process';
// import sayMyName from './fs-part';

const pkg = fs.readFileSync("package.json");
const pwd = process.cwd();

console.log(pkg.toString());
console.log(pwd);

class Name {
    constructor(
        public readonly firstname: string,
        public readonly lastname: string) {
    }

    public get name() {
        return `${this.firstname} ${this.lastname}`;
    }
}

const name = new Name("Mike", "Mitterer");
console.log(name.name);

// console.log(sayMyName());
