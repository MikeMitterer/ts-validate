import ArgumentError from '../exception/ArgumentError';
import {
    DEFAULT_INVALID_INDEX_MESSAGE,
    DEFAULT_INVALID_PROPERTY_MESSAGE,
    DEFAULT_IS_NULL_MESSAGE,
    DEFAULT_IS_TRUE_MESSAGE,
    DEFAULT_MATCHES_ALPHANUMERIC,
    DEFAULT_MATCHES_EMAIL,
    DEFAULT_MATCHES_HEX,
    DEFAULT_MATCHES_PASSWORD,
    DEFAULT_MATCHES_PATTERN,
    DEFAULT_MATCHES_UUID,
    DEFAULT_NOT_BLANK_MESSAGE,
    DEFAULT_NOT_EMPTY_MESSAGE,
} from './messages';
import pattern from './pattern';

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
export function isTrue(expression: boolean, message: Message = DEFAULT_IS_TRUE_MESSAGE): boolean {
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
export function notNull<T>(
    expression: T,
    message: Message = DEFAULT_IS_NULL_MESSAGE,
): NonNullable<T> {
    if (expression === null || expression === undefined) {
        throw new ArgumentError(message());
    }

    return expression as NonNullable<T>;
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
 * @return evaluated expression - undefined gets remove
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function notBlank(
    expression: string | undefined,
    message: Message = DEFAULT_NOT_BLANK_MESSAGE,
): string {
    notNull(expression);

    // expression is already checked against null
    if (typeof expression === 'string' && expression.trim().length === 0) {
        throw new ArgumentError(message());
    }

    // Cast away undefined
    return expression as string;
}

/**
 * Validates that the given [index] is available in the given [array]
 * and its value is not null or undefined.
 *
 * @param index Array-Index
 * @param array The Array to check against
 * @param message The exception message if invalid
 *
 * @return If the index is valid it is returned
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function isIndexValid(
    index: number,
    array: unknown[],
    message: Message = DEFAULT_INVALID_INDEX_MESSAGE(index, array),
): number {
    notNull(array);

    if (index < 0 || index >= array.length || !array[index]) {
        throw new ArgumentError(message());
    }
    return index;
}

/**
 * Validates that the given [property] is available in the given [obj]
 * and its value is not null or undefined.
 *
 * @param key Property in [obj]
 * @param obj The object to check the property against
 * @param message The exception message if invalid
 *
 * @return If the key is valid it is returned
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function isPropertyValid(
    key: string,
    obj: {},
    message: Message = DEFAULT_INVALID_PROPERTY_MESSAGE(key, obj),
): string {
    notNull(obj);

    // tslint:disable-next-line
    if (!(key in obj) || !(obj as any)[key]) {
        throw new ArgumentError(message());
    }

    return key;
}

/**
 * Validate that the specified [input] matches the specified [regex] pattern;
 * otherwise throwing an exception.
 *
 * @param input String to check against the given [regex]
 * @param regexp The Pattern to check the string against
 * @param message The exception message if invalid
 *
 * @return If the key is valid it is returned
 *
 * @throws Throws [ArgumentError] if expression is invalid
 */
export function matchesPattern(
    input: string,
    regexp: RegExp,
    message: Message = DEFAULT_MATCHES_PATTERN(input, regexp),
): boolean {
    notNull(regexp);

    if (!regexp.test(input)) {
        throw new ArgumentError(message());
    }
    return true;
}

export function isEmail(email: string, message: Message = DEFAULT_MATCHES_EMAIL(email)): boolean {
    return matchesPattern(email, pattern.EMAIL, message);
}

export function isPassword(
    password: string,
    message: Message = DEFAULT_MATCHES_PASSWORD(password),
): boolean {
    return matchesPattern(password, pattern.PW, message);
}

export function isAlphanumeric(
    value: string,
    message: Message = DEFAULT_MATCHES_ALPHANUMERIC(value),
): boolean {
    return matchesPattern(value, pattern.ALPHANUMERIC, message);
}

export function isHex(value: string, message: Message = DEFAULT_MATCHES_HEX(value)): boolean {
    return matchesPattern(value, pattern.HEX, message);
}

export function isUuid(value: string, message: Message = DEFAULT_MATCHES_UUID(value)): boolean {
    return matchesPattern(value, pattern.UUID, message);
}
