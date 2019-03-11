import * as assert from 'assert';
import * as oat from '../../../main/learn/objects.and.types';

describe('Objects and types', () => {
    it('dynamic object', () => {
        assert.equal(oat.userName.name, 'Mike');
    });

    it('type-save-object', () => {
        assert.equal(oat.userData.name, 'Gerda');
    });

    it('should return age via callback', () => {
        const person = oat.complexObject;

        assert.equal(person.callback(99), 'Age: 99');
    });

    it('Describe your test', () => {
        assert.deepEqual(oat.anotherComplexObject.data, [4, 5, 6]);
    });

    it('should mark the type of function param as N: or S:', () => {
        assert.equal(oat.showMyRealAge(99), 'N: 99');
        assert.equal(oat.showMyRealAge('99'), 'S: 99');

        assert.equal(oat.myRealAge, '99');
    });

    it('should throw and error', () => {
        assert.throws(() => oat.neverEnds(), Error);
        assert.throws(oat.neverEnds, Error);
    });

    it('should not accept null', () => {
        assert.ok(oat.tryToReturnNull('Mike') != null);
    });
});
