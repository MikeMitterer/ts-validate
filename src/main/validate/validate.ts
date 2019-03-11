import ArgumentError from '../exception/ArgumentError';
import {
    DEFAULT_IS_NULL_EX_MESSAGE,
    DEFAULT_IS_TRUE_EX_MESSAGE, DEFAULT_NOT_BLANK_MESSAGE,
    DEFAULT_NOT_EMPTY_MESSAGE,
} from './messages';

type Message = () => string;

/**
 * Validate that the argument condition is [true] otherwise
 * throwing an exception with the specified message. This method is useful when
 * validating according to an arbitrary boolean expression, such as validating a
 * primitive number or using your own custom validation expression.
 *
 * @param expression The boolean expression to check
 * @param message the exception message if invalid, not null
 *
 * @return evaluated expression
 *
 * @throws Throws [ArgumentError] if expression is [false]
 */
export function isTrue(
    expression: boolean,
    message: Message = DEFAULT_IS_TRUE_EX_MESSAGE,
): boolean {
    if (!expression) {
        throw new ArgumentError(message());
    }
    return expression;
}

/**
 * Validate that the specified argument is not [null];
 * otherwise throwing an exception.
 *
 *      Validate.notNull(myObject, () => "The object must not be null");
 *
 * The message of the exception is &quot;The validated object is
 * null&quot;.
 *
 * @param expression The expression the should evaluate against null
 * @param message The exception message if invalid
 *
 * @return evaluated expression
 *
 * @throws Throws [ArgumentError] if expression is null
 */
export function notNull<T>(expression: T, message: Message = DEFAULT_IS_NULL_EX_MESSAGE): T {
    if (expression === null || expression === undefined) {
        throw new ArgumentError(message());
    }
    return expression;
}

/**
 * Validate that the specified argument is neither null
 * nor is empty.
 *
 * @param expression The expression the should evaluate against not being empty
 * @param message The exception message if invalid
 *
 * @return evaluated expression
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function notEmpty<T = object | string>(
    expression: T,
    message: Message = DEFAULT_NOT_EMPTY_MESSAGE,
): T {
    notNull(expression);

    // tslint:disable-next-line
    if (expression.hasOwnProperty('length') && (expression as any).length === 0) {
        throw new ArgumentError(message());
    } else if (typeof expression === 'object' && Object.keys(expression).length === 0) {
        throw new ArgumentError(message());
    }

    return expression;
}

/**
 * Validate that the specified string is
 * neither null, a length of zero (no characters), empty
 * nor whitespace; otherwise throwing an exception with the specified
 * message.
 *
 * @param expression The expression the should evaluate against not being blank
 * @param message The exception message if invalid
 *
 * @return evaluated expression
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function notBlank(expression: string, message: Message = DEFAULT_NOT_BLANK_MESSAGE): string {
    notNull(expression);

    if (expression.trim().length === 0) {
        throw new ArgumentError(message());
    }

    return expression;
}
