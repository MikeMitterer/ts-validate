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
            expect(() => validate.isHex(value)).toThrow(
                new ArgumentError(`'${value}' is not a hex value!`),
            );
        });

        expect(() => validate.isHex('1234567890abcdefg', () => 'My custom message')).toThrow(
            new ArgumentError('My custom message'),
        );
    });

    test('isUuid', () => {
        const valid = [
            'c94f92b7-4c94-4f1e-bf4c-a0fe5be13210',
            '53b74c29-8b42-4646-97b2-8b9c95e3b697',
        ];

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

    const returnsStringOrUndefined: (input: string | undefined) => string | undefined = (
        input: string | undefined,
    ) => input;
});
