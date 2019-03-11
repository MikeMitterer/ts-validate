type ErrorMessage = () => string;

export const DEFAULT_IS_TRUE_EX_MESSAGE: ErrorMessage = () => 'The validated expression is false';

export const DEFAULT_IS_NULL_EX_MESSAGE: ErrorMessage = () => 'The validated object is null';

export const DEFAULT_NOT_EMPTY_MESSAGE: ErrorMessage = () => 'The validated value is empty';

export const DEFAULT_NOT_BLANK_MESSAGE: ErrorMessage = () => 'The validated string is blank';

export const DEFAULT_NO_NULL_ELEMENTS_ARRAY_EX_MESSAGE: ErrorMessage = () =>
    'The validated array contains null element';

export const DEFAULT_VALID_INDEX_ARRAY_EX_MESSAGE: ErrorMessage = () =>
    'The validated array index is invalid';

export const DEFAULT_VALID_STATE_EX_MESSAGE: ErrorMessage = () => 'The validated state is false';

export const DEFAULT_MATCHES_PATTERN_EX: ErrorMessage = () =>
    'The string does not match the pattern';

export const DEFAULT_INCLUSIVE_BETWEEN_EX_MESSAGE: ErrorMessage = () =>
    'The value is not in the specified inclusive range';

export const DEFAULT_EXCLUSIVE_BETWEEN_EX_MESSAGE: ErrorMessage = () =>
    'The value is not in the specified exclusive range';

export const DEFAULT_JSON_MESSAGE: ErrorMessage = () =>
    'The value is neither a num, String, bool, Null, List or Map';

export const DEFAULT_KEY_IN_MAP_MESSAGE: ErrorMessage = () =>
    "The key '%key%' is not available for this structure: %structure%";
