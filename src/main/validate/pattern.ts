const pattern = {
    EMAIL: new RegExp(
        '^([0-9a-zA-Z]([-.+\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$',
    ),

    PW: new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%?])[0-9a-zA-Z@#$%?]{8,15}$'),

    ALPHANUMERIC: new RegExp('^[a-zA-Z0-9öäüÖÄÜß]+$'),

    HEX: new RegExp('^(0x[a-fA-F0-9]+)|([a-fA-F0-9])+$'),

    UUID: new RegExp('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'),
};

export default pattern;
