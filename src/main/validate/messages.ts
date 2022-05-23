type ErrorMessage = () => string;

export const DEFAULT_IS_TRUE_MESSAGE: ErrorMessage = (): string => 'The validated expression is false';

export const DEFAULT_IS_NULL_MESSAGE: ErrorMessage = (): string => 'The validated object is null';

export const DEFAULT_NOT_EMPTY_MESSAGE: ErrorMessage = (): string => 'The validated value is empty';

export const DEFAULT_NOT_BLANK_MESSAGE: ErrorMessage = (): string => 'The validated string is blank';

// prettier-ignore
export const DEFAULT_INVALID_TYPE_MESSAGE: (value: unknown, type: string) => ErrorMessage
    = (value, type): ErrorMessage => (): string => `Invalid type - '${value}' is not a ${type}!`;

// prettier-ignore
export const DEFAULT_INVALID_INDEX_MESSAGE: (index: number, array: unknown[]) => ErrorMessage
    = (index, array): ErrorMessage => (): string =>
        `The validated array index is invalid! You requested index #${index} but the array had #${
            array.length } elements`;

// prettier-ignore
export const DEFAULT_INVALID_PROPERTY_MESSAGE: (key: string, obj: {}) => ErrorMessage
    = (key, obj): ErrorMessage => (): string => `The key '${key}' is not available in ${JSON.stringify(obj)}`;

// prettier-ignore
export const DEFAULT_MATCHES_PATTERN: (input: string, pattern: RegExp) => ErrorMessage
    = (input, pattern): ErrorMessage => (): string =>
        `The string '${input}' does not match the given pattern: '${pattern.source}'!`;

// prettier-ignore
export const DEFAULT_MATCHES_EMAIL: (value: string) => ErrorMessage
    = (value): ErrorMessage => (): string => `'${value}' is not a valid email address!`;

// prettier-ignore
export const DEFAULT_MATCHES_HOSTNAME: (value: string) => ErrorMessage
    = (value): ErrorMessage => (): string => `'${value}' is not a valid hostname!`;

// prettier-ignore
export const DEFAULT_MATCHES_PASSWORD: (pw: string) => ErrorMessage
    = (pw): ErrorMessage => (): string => `'${pw}' is not a valid password!`;

// prettier-ignore
export const DEFAULT_MATCHES_ALPHANUMERIC: (value: string) => ErrorMessage
    = (value): ErrorMessage => (): string => `'${value}' is not a alphanumeric value!`;

// prettier-ignore
export const DEFAULT_MATCHES_HEX: (value: string) => ErrorMessage
    = ( value): ErrorMessage => (): string => `'${value}' is not a hex value!`;

// prettier-ignore
export const DEFAULT_MATCHES_UUID: (value: string) => ErrorMessage
    = (value): ErrorMessage => (): string => `'${value}' is not a UUID value!`;

export const DEFAULT_EXCLUSIVE_BETWEEN_MESSAGE: ErrorMessage = (): string =>
    'The value is not in the specified exclusive range';

export const DEFAULT_JSON_MESSAGE: ErrorMessage = (): string =>
    'The value is neither a num, String, bool, Null, List or Map';

export const DEFAULT_PORT_MESSAGE = (port: string | number): ErrorMessage => (): string =>
    `'${port}' is not a valid port number!`;

export const DEFAULT_MATCHES_URL: (url: string) => ErrorMessage = (url): ErrorMessage => (): string =>
    `'${url}' is not a valid URL!`;

// prettier-ignore
export const DEFAULT_INCLUSIVE_BETWEEN_MESSAGE: (value: number, start: number, end: number) => ErrorMessage
    = (value, start, end): ErrorMessage => (): string =>
        `'${value}' is not in the specified inclusive range (${start}/${end})!`;

export const DEFAULT_MATCHES_JWT: (token: string) => ErrorMessage = (token): ErrorMessage => (): string =>
    `'${token}' is not a valid WebToken!`;

export const DEFAULT_IS_LOCATION_MESSAGE: (latitude: number, longitude: number) => ErrorMessage = (latitude: number, longitude: number): ErrorMessage => (): string =>
    `'${latitude}'/'${longitude}' is not a valid Location`;
