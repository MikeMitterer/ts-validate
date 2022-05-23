import { ArgumentError } from '../exception';
import {
    DEFAULT_INCLUSIVE_BETWEEN_MESSAGE,
    DEFAULT_INVALID_INDEX_MESSAGE,
    DEFAULT_INVALID_PROPERTY_MESSAGE,
    DEFAULT_INVALID_TYPE_MESSAGE,
    DEFAULT_IS_NULL_MESSAGE,
    DEFAULT_IS_TRUE_MESSAGE,
    DEFAULT_IS_LOCATION_MESSAGE,
    DEFAULT_MATCHES_ALPHANUMERIC,
    DEFAULT_MATCHES_EMAIL,
    DEFAULT_MATCHES_HEX,
    DEFAULT_MATCHES_HOSTNAME,
    DEFAULT_MATCHES_JWT,
    DEFAULT_MATCHES_PASSWORD,
    DEFAULT_MATCHES_PATTERN,
    DEFAULT_MATCHES_URL,
    DEFAULT_MATCHES_UUID,
    DEFAULT_NOT_BLANK_MESSAGE,
    DEFAULT_NOT_EMPTY_MESSAGE,
    DEFAULT_PORT_MESSAGE
} from './messages'
import pattern from './pattern';

export type Message = () => string;

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
export function isTrue(expression: boolean, message: Message = DEFAULT_IS_TRUE_MESSAGE): boolean | never {
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
): NonNullable<T> | never {
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
): T | never {
    notNull(expression);

    // TS complains with: Property 'hasOwnProperty' does not exist on type 'T'....
    // @ts-ignore
    // tslint:disable-next-line:no-any
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
): string | never {
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
export function isIndexValid<T>(
    index: number,
    array: T[],
    message: Message = DEFAULT_INVALID_INDEX_MESSAGE(index, array),
): T | never {
    notNull(array);

    if (index < 0 || index >= array.length || !array[index]) {
        throw new ArgumentError(message());
    }
    return array[index];
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
): string | never {
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
): string | never {
    notNull(regexp);

    if (!regexp.test(input)) {
        throw new ArgumentError(message());
    }
    return input;
}

export function isEmail(email: string, message: Message = DEFAULT_MATCHES_EMAIL(email)): string | never {
    return matchesPattern(email, pattern.EMAIL, message);
}

/** Length of hostname must not exceed 255 characters */
// prettier-ignore
export function isHostname(hostname: string, message: Message = DEFAULT_MATCHES_HOSTNAME(hostname)): string | never {
    matchesPattern(hostname, pattern.HOSTNAME, message);
    if (hostname.length > 255) {
        throw new ArgumentError(message());
    }
    return hostname;
}

// prettier-ignore
export function isPassword( password: string, message: Message = DEFAULT_MATCHES_PASSWORD(password)): string | never {
    return matchesPattern(password, pattern.PW, message);
}

// prettier-ignore
export function isAlphanumeric(value: string, message: Message = DEFAULT_MATCHES_ALPHANUMERIC(value)): string | never {
    return matchesPattern(value, pattern.ALPHANUMERIC, message);
}

export function isHex(value: string, message: Message = DEFAULT_MATCHES_HEX(value)): string | never {
    return matchesPattern(value, pattern.HEX, message);
}

export function isUuid(value: string, message: Message = DEFAULT_MATCHES_UUID(value)): string | never {
    return matchesPattern(value, pattern.UUID, message);
}

export function isUrl(url: string, message: Message = DEFAULT_MATCHES_URL(url)): string | never {
    try {
        const valid = matchesPattern(url, pattern.URL, message);

        // Recognizes e.g. http://192.168.0.42:8060:1
        
        // tslint:disable-next-line:no-unused-expression
        new URL(url);

        return valid;
    } catch (e) {
        throw new ArgumentError(message());
    }
}

// prettier-ignore
export function isPort( value: string | number, message: Message = DEFAULT_PORT_MESSAGE(value)): number | never {
    const portToNumber = (portToConvert: string | number): number | never => {
        if (typeof portToConvert === 'number') {
            return portToConvert;
        }
        const result = parseInt(portToConvert, 10);
        if (isNaN(result)) {
            throw new ArgumentError(message());
        }
        return result;
    };

    const port = portToNumber(value);
    if (port < 1 || port > 65535) {
        throw new ArgumentError(message());
    }
    return port;
}

// prettier-ignore
export function inclusiveBetween(value: number, start: number, end: number, message: Message
    = DEFAULT_INCLUSIVE_BETWEEN_MESSAGE(value, start, end)): number | never {

    // noinspection SuspiciousTypeOfGuard
    if (typeof value !== 'number') {
        throw new ArgumentError(DEFAULT_INVALID_TYPE_MESSAGE(value, 'number')());
    }

    if (value < start || value > end) {
        throw new ArgumentError(message());
    }

    return value;
}

// prettier-ignore
export function isWebToken(token: string, message: Message = DEFAULT_MATCHES_JWT(token)): string | never {
    return matchesPattern(token, pattern.JWT, message);
}

// prettier-ignore
export function isLocation(latitude: number, longitude: number,
    message: Message = DEFAULT_IS_LOCATION_MESSAGE(latitude, longitude)): { latitude: number, longitude: number} {

    // noinspection SuspiciousTypeOfGuard
    if (typeof latitude !== 'number') {
        throw new ArgumentError(DEFAULT_INVALID_TYPE_MESSAGE(latitude, 'number')());
    }

    // noinspection SuspiciousTypeOfGuard
    if (typeof longitude !== 'number') {
        throw new ArgumentError(DEFAULT_INVALID_TYPE_MESSAGE(longitude, 'number')());
    }

    if(latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        throw new ArgumentError(message());
    }

    return { latitude, longitude }
}
