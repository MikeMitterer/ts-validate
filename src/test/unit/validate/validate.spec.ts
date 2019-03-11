// import { loggerFactory } from '../../main/config/ConfigLog4j';
import 'jest-extended';
import ArgumentError from '../../../main/exception/ArgumentError';
import * as error from '../../../main/validate/messages';
import * as validate from '../../../main/validate/validate';

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
        expect(() => validate.isTrue(false)).toThrow(error.DEFAULT_IS_TRUE_EX_MESSAGE());
    });

    test('Custom message', () => {
        expect(() => validate.isTrue(false, () => 'Fehler')).toThrow('Fehler');
    });

    test('null check', () => {
        expect(validate.notNull('abc')).toBe('abc');

        // tslint:disable-next-line
        expect(() => validate.notNull(null)).toThrow(ArgumentError);

        // tslint:disable-next-line
        expect(() => validate.notNull(null)).toThrow(error.DEFAULT_IS_NULL_EX_MESSAGE());
    });

    test('not Empty', () => {
        expect(validate.notEmpty('abc')).toBe('abc');
        expect(validate.notEmpty([1, 2, 3])).toBeArray();

        expect(() => validate.notEmpty('')).toThrow(ArgumentError);
        expect(() => validate.notEmpty([])).toThrow(ArgumentError);
        expect(() => validate.notEmpty({})).toThrow(ArgumentError);
    });

    test("not blank", () => {
        expect(validate.notBlank("abc")).toBe("abc");
        expect(validate.notBlank("   1")).toBe("   1");

        expect(() => validate.notBlank('   ')).toThrow(ArgumentError);
        expect(() => validate.notBlank('')).toThrow(ArgumentError);
    });
});
