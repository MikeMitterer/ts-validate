import * as assert from 'assert';
import { returnMyName } from '../../../main/learn/function.exports';
import {
    functionWithDefaultParams,
    functionWithOptionalParams,
    myCallback,
} from '../../../main/ptest/functions';

describe('functions', () => {
    it('test simple function', () => {
        assert.equal(returnMyName(), 'Mike');
    });

    it('function as param', () => {
        // Prototype definition
        let callback: () => string;

        callback = myCallback;
        assert.equal(callback(), 'Mike6');
    });

    it('should check age as optional param', () => {
        assert.equal(functionWithOptionalParams('Mike', 51), 'Hi Mike, your age is 51');

        assert.equal(functionWithOptionalParams('Mike'), 'Hi Mike, your age is <undefined>');
    });

    it('should return Mike Mitterer', () => {
        assert.equal(functionWithDefaultParams('Mike'), 'Hi Mike Mitterer');
        assert.equal(functionWithDefaultParams('Gerda', 'Riedmann'), 'Hi Gerda Riedmann');
    });
});
