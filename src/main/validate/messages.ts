type ErrorMessage = () => string;

export const DEFAULT_IS_TRUE_MESSAGE: ErrorMessage = () => 'The validated expression is false';

export const DEFAULT_IS_NULL_MESSAGE: ErrorMessage = () => 'The validated object is null';

export const DEFAULT_NOT_EMPTY_MESSAGE: ErrorMessage = () => 'The validated value is empty';

export const DEFAULT_NOT_BLANK_MESSAGE: ErrorMessage = () => 'The validated string is blank';

export const DEFAULT_INVALID_INDEX_MESSAGE: (index: number, array: unknown[]) => ErrorMessage = (
    index,
    array,
) => () =>
    `The validated array index is invalid! You requested index #${index} but the array had #${
        array.length
    } elements`;

export const DEFAULT_INVALID_PROPERTY_MESSAGE: (key: string, obj: {}) => ErrorMessage = (
    key,
    obj,
) => () => `The key '${key}' is not available in ${JSON.stringify(obj)}`;

export const DEFAULT_MATCHES_PATTERN: (input: string, pattern: RegExp) => ErrorMessage = (
    input,
    pattern,
) => () => `The string '${input}' does not match the given pattern: '${pattern.source}'!`;

export const DEFAULT_MATCHES_EMAIL: (value: string) => ErrorMessage = (value) => () =>
    `'${value}' is not a valid email address!`;

export const DEFAULT_MATCHES_PASSWORD: (pw: string) => ErrorMessage = (pw) => () =>
    `'${pw}' is not a valid password!`;

export const DEFAULT_MATCHES_ALPHANUMERIC: (value: string) => ErrorMessage = (value) => () =>
    `'${value}' is not a alphanumeric value!`;

export const DEFAULT_MATCHES_HEX: (value: string) => ErrorMessage = (value) => () =>
    `'${value}' is not a hex value!`;

export const DEFAULT_MATCHES_UUID: (value: string) => ErrorMessage = (value) => () =>
    `'${value}' is not a UUID value!`;

export const DEFAULT_INCLUSIVE_BETWEEN_MESSAGE: ErrorMessage = () =>
    'The value is not in the specified inclusive range';

export const DEFAULT_EXCLUSIVE_BETWEEN_MESSAGE: ErrorMessage = () =>
    'The value is not in the specified exclusive range';

export const DEFAULT_JSON_MESSAGE: ErrorMessage = () =>
    'The value is neither a num, String, bool, Null, List or Map';

export const DEFAULT_KEY_IN_MAP_MESSAGE: ErrorMessage = () =>
    "The key '%key%' is not available for this structure: %structure%";
