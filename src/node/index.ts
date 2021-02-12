import { LoggerFactory } from '@mmit/logging';
import * as fs from 'fs';
import * as process from 'process';
import * as validate from '../main/';

// import sayMyName from './fs-part';

const pkg = fs.readFileSync('package.json');
const pwd = process.cwd();
const logger = LoggerFactory.getLogger('main');

logger.info(pkg.toString());
logger.info(pwd);

class Name {
    constructor(public readonly firstname: string, public readonly lastname: string) {}

    public get name(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}

const name = new Name('Mike', 'Mitterer');
logger.info(name.name);

logger.info(validate.isUrl("http://www.mikemitterer.at"));
logger.info(validate.isUrl("http://www.mikemitterer.at:8080"));
try {
    logger.info(validate.isUrl("http://www.mikemitterer.at:8080:1"));
} catch (e) {
    logger.error("http://www.mikemitterer.at:8080:1 is INVALID!");
}
