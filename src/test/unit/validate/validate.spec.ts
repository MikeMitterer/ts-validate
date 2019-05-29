// import { loggerFactory } from '../../main/config/ConfigLog4j';
import 'jest-extended';
import { ArgumentError } from '../../../main';
import * as error from '../../../main/validate/messages';
import * as validate from '../../../main/validate/validate';

type MyName = string | undefined;

describe('validate.spec.ts', () => {
    // const logger = loggerFactory.getLogger('test.validate.spec.ts');

    // beforeEach(() => {
    // });
    //
    // afterEach(() => {
    // });

    test('isTrue ', () => {
        expect(validate.isTrue(true)).toBe(true);
        expect(() => validate.isTrue(false)).toThrow(ArgumentError);
        expect(() => validate.isTrue(false)).toThrow(error.DEFAULT_IS_TRUE_MESSAGE());
    });

    test('Custom message', () => {
        expect(() => validate.isTrue(false, () => 'Fehler')).toThrow('Fehler');
    });

    test('null check', () => {
        expect(validate.notNull('abc')).toBe('abc');

        const sayMyName = (name: MyName): MyName => name;
        const checkedName = (name: MyName): string => validate.notNull(sayMyName(name));

        expect(checkedName('Mike')).toBe('Mike');

        // tslint:disable-next-line
        expect(() => validate.notNull(null)).toThrow(ArgumentError);

        // tslint:disable-next-line
        expect(() => validate.notNull(null)).toThrow(error.DEFAULT_IS_NULL_MESSAGE());

        expect(() => checkedName(undefined)).toThrow(ArgumentError);
    });

    test('not Empty', () => {
        expect(validate.notEmpty('abc')).toBe('abc');
        expect(validate.notEmpty([1, 2, 3])).toBeArray();
        expect(validate.notEmpty({ name: 'Mike' })).toMatchObject({ name: 'Mike' });

        const obj = { name: 'Mike' };
        expect(validate.notEmpty(obj)).toMatchObject(obj);

        expect(() => validate.notEmpty('')).toThrow(ArgumentError);
        expect(() => validate.notEmpty([])).toThrow(ArgumentError);
        expect(() => validate.notEmpty({})).toThrow(ArgumentError);

        expect(() => validate.notEmpty({}, () => 'Object must not be empty!')).toThrow(
            'Object must not be empty!',
        );
    });

    test('Change return value from string | undefined to string', () => {
        // Type string | undefined can not evaluated to string
        // const result: string = returnsStringOrUndefined("Mike");

        // notBlank removes undefined!
        const result: string = validate.notBlank(returnsStringOrUndefined('Mike'));
        expect(result).toBe('Mike');
    });

    test('not blank', () => {
        expect(validate.notBlank('abc')).toBe('abc');
        expect(validate.notBlank('   1')).toBe('   1');

        expect(() => validate.notBlank('   ')).toThrow(ArgumentError);
        expect(() => validate.notBlank('')).toThrow(ArgumentError);
    });

    test('isIndexValid', () => {
        expect(validate.isIndexValid(1, [1, 2, 3])).toBe(1);
        expect(() => validate.isIndexValid(3, [1, 2, 3])).toThrow(ArgumentError);

        expect(() => validate.isIndexValid(3, [1, 2, 3])).toThrow(
            'The validated array index is invalid! You requested index #3 but the array had #3 elements',
        );
    });

    test('isPropertyValid', () => {
        expect(validate.isPropertyValid('name', { name: 'Mike' })).toBe('name');

        expect(() => validate.isPropertyValid('name1', { name: 'Mike' })).toThrow(ArgumentError);
        expect(() => validate.isPropertyValid('name1', { name: 'Mike' })).toThrow(
            'The key \'name1\' is not available in {"name":"Mike"}',
        );
    });

    test('matchesPattern', () => {
        expect(validate.matchesPattern('Mike', /^M.*/)).toBeTrue();
        expect(validate.matchesPattern('Mike', /^M.*e$/)).toBeTrue();

        expect(() => validate.matchesPattern('Mik', /^M.*e$/)).toThrow(
            new ArgumentError("The string 'Mik' does not match the given pattern: '^M.*e$'!"),
        );
    });

    test('matches email', () => {
        expect(validate.isEmail('office@mikemitterer.at')).toBeTrue();
        expect(validate.isEmail('urbi@orbi.it')).toBeTrue();
        expect(validate.isEmail('urbi@orbi.com')).toBeTrue();
        expect(validate.isEmail('mike.mitterer@orbi.com')).toBeTrue();

        expect(() => validate.isEmail('mike.mitterer@orbi')).toThrow(
            new ArgumentError("'mike.mitterer@orbi' is not a valid email address!"),
        );
    });

    test('matches password', () => {
        expect(validate.isPassword('1abcdefGH#')).toBeTrue();
        expect(validate.isPassword('1abcdefGH?')).toBeTrue();

        const invalid = [
            'urbi@orbi.it',
            '1234567890abcdefGH#',
            '12345678aA# ',
            "12345678aA'",
            '',
            '1abcdefGH;',
        ];
        invalid.forEach((value) => {
            expect(() => validate.isPassword(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid password!`),
            );
        });
    });

    test('isAlphanumeric', () => {
        const valid = ['123abcdö', '123'];

        valid.forEach((value) => {
            expect(validate.isAlphanumeric(value)).toBeTrue();
        });

        const invalid = ['123a#cdö', ''];

        invalid.forEach((value) => {
            expect(() => validate.isAlphanumeric(value)).toThrow(
                new ArgumentError(`'${value}' is not a alphanumeric value!`),
            );
        });
    });

    test('isHex', () => {
        const valid = ['1234567890abcdef', '0x1234567890abcdef'];

        valid.forEach((value) => {
            expect(validate.isHex(value)).toBeTrue();
        });

        const invalid = ['1234567890abcdefg', ''];

        invalid.forEach((value) => {
            expect(() => validate.isHex(value)).toThrow(new ArgumentError(`'${value}' is not a hex value!`));
        });

        expect(() => validate.isHex('1234567890abcdefg', () => 'My custom message')).toThrow(
            new ArgumentError('My custom message'),
        );
    });

    test('isUuid', () => {
        const valid = ['c94f92b7-4c94-4f1e-bf4c-a0fe5be13210', '53b74c29-8b42-4646-97b2-8b9c95e3b697'];

        valid.forEach((value) => {
            expect(validate.isUuid(value)).toBeTrue();
        });

        const invalid = ['1234', ''];

        invalid.forEach((value) => {
            expect(() => validate.isUuid(value)).toThrow(
                new ArgumentError(`'${value}' is not a UUID value!`),
            );
        });
    });

    test('isHostname', () => {
        const valid = ['www.google.com', 'bf', 'bf-msn', 'bf-msn', 'www.GOOGLE.com'];

        valid.forEach((value) => {
            expect(validate.isHostname(value)).toBeTrue();
        });

        const invalid = ['bf-', '', 'www.goo gle.com'];

        invalid.forEach((value) => {
            expect(() => validate.isHostname(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid hostname!`),
            );
        });
    });

    test('isPortNumber', () => {
        const valid: ReadonlyArray<string | number> = [1, 80, 8080, '55', '1', 65535, '65535'];

        valid.forEach((value) => {
            const port = validate.isPort(value);
            const parsed = typeof value === 'number' ? value : parseInt(value, 10);
            expect(port).toBe(parsed);
        });

        const invalid: ReadonlyArray<string | number> = ['abc', 0, 9999999];

        invalid.forEach((value) => {
            expect(() => validate.isPort(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid port number!`),
            );
        });
    });

    test('URL', () => {
        const valid = [
            'https://www.example.com',
            'http://www.example.com',
            'http://blog.example.com',
            'http://www.example.com/product',
            'http://www.example.com/products?id=1&page=2',
            'http://www.example.com#up',
            'http://www.example.com#up?name=Mike',
            'http://www.example.com#up/?name=Mike',
            'http://www.example.com#up/?name=Mike&page=3',
            'http://www.site.com:8008',
            'https://www.site.com:8008',
            'https://localhost',
            'http://localhost:8080',
            'http://255.255.255.255',
        ];
        const invalid = [
            '',
            'ftp://www.example.com',
            '255.255.255.255',
            'www.example.com',
            'example.com',
            'w1://www.site.com:8008',
            'http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2',
            'ws://www.site.com:8008',
            'wss://www.site.com:8008',
        ];

        valid.forEach((value) => {
            const isValid = validate.isUrl(value);
            expect(isValid).toBeTrue();
        });

        invalid.forEach((value) => {
            expect(() => validate.isUrl(value)).toThrow(new ArgumentError(`'${value}' is not a valid URL!`));
        });
    });

    const returnsStringOrUndefined: (input: string | undefined) => string | undefined = (
        input: string | undefined,
    ): string | undefined => input;
});
