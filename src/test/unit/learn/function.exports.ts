import { endsWith, returnMyName } from '../../../main/learn/function.exports';

describe('Some main functions 1', () => {
    test('should say Mike2', () => {
        expect(returnMyName()).toBe('Mike');
    });
});

describe('#endsWith()', () => {
    it('should return true when the value ends with the suffix', () => {
        expect(endsWith('abcd', 'bcd')).toBe(true);
    });

    it('should return false when the value does not end with the suffix', () => {
        expect(endsWith('abcd', 'cde')).toBe(false);
    });
});
