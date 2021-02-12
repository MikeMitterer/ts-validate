/**
 * RegExp-Tester: https://www.regextester.com/
 */
const pattern = {
    EMAIL: new RegExp(
        '^([0-9a-zA-Z]([-.+\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$',
    ),

    /** Comes from: https://stackoverflow.com/a/3824105/504184 */
    HOSTNAME: new RegExp(
        // tslint:disable-next-line:max-line-length
        '^[a-z\\d]([a-z\\d\\-]{0,61}[a-z\\d])?(\\.[a-z\\d]([a-z\\d\\-]{0,61}[a-z\\d])?)*$',
        'i',
    ),

    PW: new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%?])[0-9a-zA-Z@#$%?]{8,15}$'),

    ALPHANUMERIC: new RegExp('^[a-zA-Z0-9öäüÖÄÜß]+$'),

    HEX: new RegExp('^(0x[a-fA-F0-9]+)|([a-fA-F0-9])+$'),

    UUID: new RegExp('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'),

    // Test: https://regex101.com/r/w7Z6PV/7/
    URL: new RegExp(/^\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))$/),

    JWT: new RegExp(/^[a-zA-Z0-9\-_=]+?\.[a-zA-Z0-9\-_=]+?\.([a-zA-Z0-9\-_=]+)?$/),
};

export default pattern;
