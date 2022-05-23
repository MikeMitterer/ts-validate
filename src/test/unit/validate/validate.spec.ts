/* tslint:disable:max-line-length */
// import { loggerFactory } from '../../main/config/ConfigLog4j';
import 'jest-extended'
import { ArgumentError } from '../../../main'
import * as error from '../../../main/validate/messages'
import * as validate from '../../../main/validate/validate'

type MyName = string | undefined;

describe('validate.spec.ts', (): void => {
    // const logger = loggerFactory.getLogger('test.validate.spec.ts');

    // beforeEach((): void => {
    // });
    //
    // afterEach((): void => {
    // });

    test('isTrue ', (): void => {
        expect(validate.isTrue(true)).toBe(true)
        expect((): boolean => validate.isTrue(false)).toThrow(ArgumentError)
        expect((): boolean => validate.isTrue(false)).toThrow(error.DEFAULT_IS_TRUE_MESSAGE())
    })

    test('Custom message', (): void => {
        expect((): boolean => validate.isTrue(false, (): string => 'Fehler')).toThrow('Fehler')
    })

    test('null check', (): void => {
        expect(validate.notNull('abc')).toBe('abc')

        const sayMyName = (name: MyName): MyName => name
        const checkedName = (name: MyName): string => validate.notNull(sayMyName(name))

        expect(checkedName('Mike')).toBe('Mike')

        // tslint:disable-next-line
        expect((): never => validate.notNull(null)).toThrow(ArgumentError)

        // tslint:disable-next-line
        expect(() => validate.notNull(null)).toThrow(error.DEFAULT_IS_NULL_MESSAGE())

        expect((): string => checkedName(undefined)).toThrow(ArgumentError)
    })

    test('not Empty', (): void => {
        expect(validate.notEmpty('abc')).toBe('abc')
        expect(validate.notEmpty([ 1, 2, 3 ])).toBeArray()
        expect(validate.notEmpty({ name: 'Mike' })).toMatchObject({ name: 'Mike' })

        const obj = { name: 'Mike' }
        expect(validate.notEmpty(obj)).toMatchObject(obj)

        expect((): string => validate.notEmpty('')).toThrow(ArgumentError)
        expect((): [] => validate.notEmpty([])).toThrow(ArgumentError)
        expect((): {} => validate.notEmpty({})).toThrow(ArgumentError)

        expect((): {} => validate.notEmpty({}, (): string => 'Object must not be empty!')).toThrow(
            'Object must not be empty!'
        )
    })

    test('Change return value from string | undefined to string', (): void => {
        // Type string | undefined can not evaluated to string
        // const result: string = returnsStringOrUndefined("Mike");

        // notBlank removes undefined!
        const result: string = validate.notBlank(returnsStringOrUndefined('Mike'))
        expect(result).toBe('Mike')
    })

    test('not blank', (): void => {
        expect(validate.notBlank('abc')).toBe('abc')
        expect(validate.notBlank('   1')).toBe('   1')

        expect((): string => validate.notBlank('   ')).toThrow(ArgumentError)
        expect((): string => validate.notBlank('')).toThrow(ArgumentError)
    })

    test('isIndexValid', (): void => {
        expect(validate.isIndexValid(1, [ 1, 2, 3 ])).toBe(2)
        expect((): number => validate.isIndexValid(3, [ 1, 2, 3 ])).toThrow(ArgumentError)

        expect((): number => validate.isIndexValid(3, [ 1, 2, 3 ])).toThrow(
            'The validated array index is invalid! You requested index #3 but the array had #3 elements'
        )
    })

    test('isPropertyValid', (): void => {
        expect(validate.isPropertyValid('name', { name: 'Mike' })).toBe('name')

        expect((): string => validate.isPropertyValid('name1', { name: 'Mike' })).toThrow(ArgumentError)
        expect((): string => validate.isPropertyValid('name1', { name: 'Mike' })).toThrow(
            'The key \'name1\' is not available in {"name":"Mike"}'
        )
    })

    test('matchesPattern', (): void => {
        expect(validate.matchesPattern('Mike', /^M.*/)).toBe('Mike')
        expect(validate.matchesPattern('Mike', /^M.*e$/)).toBe('Mike')

        expect(():string => validate.matchesPattern('Mik', /^M.*e$/)).toThrow(
            new ArgumentError('The string \'Mik\' does not match the given pattern: \'^M.*e$\'!')
        )
    })

    test('matches email', (): void => {
        expect(validate.isEmail('office@mikemitterer.at')).toBe('office@mikemitterer.at')
        expect(validate.isEmail('urbi@orbi.it')).toBe('urbi@orbi.it')
        expect(validate.isEmail('urbi@orbi.com')).toBe('urbi@orbi.com')
        expect(validate.isEmail('mike.mitterer@orbi.com')).toBe('mike.mitterer@orbi.com')

        expect((): string => validate.isEmail('mike.mitterer@orbi')).toThrow(
            new ArgumentError('\'mike.mitterer@orbi\' is not a valid email address!')
        )
    })

    test('matches password', (): void => {
        expect(validate.isPassword('1abcdefGH#')).toBe('1abcdefGH#')
        expect(validate.isPassword('1abcdefGH?')).toBe('1abcdefGH?')

        const invalid = [
            'urbi@orbi.it',
            '1234567890abcdefGH#',
            '12345678aA# ',
            '12345678aA\'',
            '',
            '1abcdefGH;'
        ]
        invalid.forEach((value: string): void => {
            expect(():string => validate.isPassword(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid password!`)
            )
        })
    })

    test('isAlphanumeric', (): void => {
        const valid = [ '123abcdö', '123' ]

        valid.forEach((value: string): void => {
            expect(validate.isAlphanumeric(value)).toBe(value)
        })

        const invalid = [ '123a#cdö', '' ]

        invalid.forEach((value: string):void => {
            expect((): string => validate.isAlphanumeric(value)).toThrow(
                new ArgumentError(`'${value}' is not a alphanumeric value!`)
            )
        })
    })

    test('isHex', (): void => {
        const valid = [ '1234567890abcdef', '0x1234567890abcdef' ]

        valid.forEach((value: string): void => {
            expect(validate.isHex(value)).toBe(value)
        })

        const invalid = [ '1234567890abcdefg', '' ]

        invalid.forEach((value: string): void => {
            expect((): string => validate.isHex(value)).toThrow(new ArgumentError(`'${value}' is not a hex value!`))
        })

        expect((): string => validate.isHex('1234567890abcdefg', (): string => 'My custom message')).toThrow(
            new ArgumentError('My custom message')
        )
    })

    test('isUuid', (): void => {
        const valid = [ 'c94f92b7-4c94-4f1e-bf4c-a0fe5be13210', '53b74c29-8b42-4646-97b2-8b9c95e3b697' ]

        valid.forEach((value: string): void => {
            expect(validate.isUuid(value)).toBe(value)
        })

        const invalid = [ '1234', '' ]

        invalid.forEach((value: string): void => {
            expect((): string => validate.isUuid(value)).toThrow(
                new ArgumentError(`'${value}' is not a UUID value!`)
            )
        })
    })

    test('isHostname', (): void => {
        const valid = [ 'www.google.com', 'bf', 'bf-msn', 'bf-msn', 'www.GOOGLE.com' ]

        valid.forEach((value: string): void => {
            expect(validate.isHostname(value)).toBe(value)
        })

        const invalid = [ 'bf-', '', 'www.goo gle.com' ]

        invalid.forEach((value: string): void => {
            expect((): string => validate.isHostname(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid hostname!`)
            )
        })
    })

    test('isPortNumber', (): void => {
        const valid: ReadonlyArray<string | number> = [ 1, 80, 8080, '55', '1', 65535, '65535' ]

        valid.forEach((value: string | number): void => {
            const port = validate.isPort(value)
            const parsed = typeof value === 'number' ? value : parseInt(value, 10)
            expect(port).toBe(parsed)
        })

        const invalid: ReadonlyArray<string | number> = [ 'abc', 0, 9999999 ]

        invalid.forEach((value: string | number): void => {
            expect((): number => validate.isPort(value)).toThrow(
                new ArgumentError(`'${value}' is not a valid port number!`)
            )
        })
    })

    test('URL', (): void => {
        const valid = [
            'https://www.example.com',
            'http://www.example.com',
            'http://blog.example.com',
            'http://www.example.com/product',
            'http://www.example.com/products?id=1&page=2',
            'http://www.example.com#up',
            'http://www.example.com#up?name=Mike',
            'http://www.example.com#up/?name=Mike',
            'http://www.example.com#up/?name=Mike&page=3',
            'http://www.site.com:8008',
            'https://www.site.com:8008',
            'https://www.site.com:8008/test.html',
            'https://www.site.com:8008/test.jpg',
            'https://localhost',
            'http://localhost:8080',
            'http://255.255.255.255',
            'http://192.168.0.42:8060/:1',
            'https://host.mobiad.io:443'
        ]
        const invalid = [
            '',
            'ftp://www.example.com',
            '255.255.255.255',
            'www.example.com',
            'example.com',
            'w1://www.site.com:8008',
            'http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2',
            'ws://www.site.com:8008',
            'wss://www.site.com:8008',
            'http://192.168.0.42:8060:1'
        ]

        valid.forEach((value: string): void => {
            const url = validate.isUrl(value)
            expect(url).toBe(value)
        })

        invalid.forEach((value: string): void => {
            expect((): string => validate.isUrl(value)).toThrow(new ArgumentError(`'${value}' is not a valid URL!`))
        })
    })

    test('inclusiveBetween', (): void => {
        const valid: readonly number[] = [ 5, 6, 99, 99.8, 99.9 ]
        const invalid: readonly number[] = [ 1, 2, 3, 4.99, 100 ]

        valid.forEach((value: number): void => {
            expect(validate.inclusiveBetween(value, 5, 99.9))
        })

        invalid.forEach((value: number): void => {
            expect((): number => validate.inclusiveBetween(value, 5, 99.9)).toThrow(
                new ArgumentError(`'${value}' is not in the specified inclusive range (${5}/${99.9})!`)
            )
        })

        // expect( ).toBe( );
    })

    test('JavaWebToken', (): void => {
        const valid = [
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyMzYyOGE3YjkzOGYxZTA3MTdkOTZhZTFiZDY1NzllODBlYmQ5NjEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC04MDY5ODY4NTE4MTA2MTg0ODYwIiwiYXVkIjoicHJvamVjdC04MDY5ODY4NTE4MTA2MTg0ODYwIiwiYXV0aF90aW1lIjoxNDY0MDAzODQxLCJ1c2VyX2lkIjoiZ3o3NDZHMnJIMWhpbUVKdHhibjkwWGJmWjc4MiIsInN1YiI6Imd6NzQ2RzJySDFoaW1FSnR4Ym45MFhiZlo3ODIiLCJpYXQiOjE0NjQwMDM4NDEsImV4cCI6MTQ2NDAwNzQ0MSwiZW1haWwiOiJvZmZpY2VAbWlrZW1pdHRlcmVyLmF0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm9mZmljZUBtaWtlbWl0dGVyZXIuYXQiXX19fQ.FI2Q74Kf-1bJVI37X-8fJ7BrHdGompy4n24GxNq_A3ZTs8xgyNQEzynAxJrVyz94BzvgWp1Hc-9LRXXmEJVFr7kIcQIrSTJgQUbKZI687HlKuXI6-mN26wUziICIA0GqJIJcxRwcU6C_tesoQZxIo05cY29lvJmkVq7FPkTNcps_nDMHObsj-8NTT2e1H7d5gx-Zhl8XU9uM_FDB-aA98lmbreS-PgBdFv9IyCTXOh6hfeOTPO5w3Lht9z1WOAmiGHCHcmfk0qGTDGDzjisRhlofDetCaAtyvH1qoyju0CIjp9VWiiLlV-oZ0at9fJiStLjs6oGbJtCf-r34HeKxRA',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        ]
        const invalid = [
            '',
            'e.yJhbGciOiJSUzI1NiIsImtpZCI6IjUyMzYyOGE3YjkzOGYxZTA3MTdkOTZhZTFiZDY1NzllODBlYmQ5NjEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC04MDY5ODY4NTE4MTA2MTg0ODYwIiwiYXVkIjoicHJvamVjdC04MDY5ODY4NTE4MTA2MTg0ODYwIiwiYXV0aF90aW1lIjoxNDY0MDAzODQxLCJ1c2VyX2lkIjoiZ3o3NDZHMnJIMWhpbUVKdHhibjkwWGJmWjc4MiIsInN1YiI6Imd6NzQ2RzJySDFoaW1FSnR4Ym45MFhiZlo3ODIiLCJpYXQiOjE0NjQwMDM4NDEsImV4cCI6MTQ2NDAwNzQ0MSwiZW1haWwiOiJvZmZpY2VAbWlrZW1pdHRlcmVyLmF0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm9mZmljZUBtaWtlbWl0dGVyZXIuYXQiXX19fQ.FI2Q74Kf-1bJVI37X-8fJ7BrHdGompy4n24GxNq_A3ZTs8xgyNQEzynAxJrVyz94BzvgWp1Hc-9LRXXmEJVFr7kIcQIrSTJgQUbKZI687HlKuXI6-mN26wUziICIA0GqJIJcxRwcU6C_tesoQZxIo05cY29lvJmkVq7FPkTNcps_nDMHObsj-8NTT2e1H7d5gx-Zhl8XU9uM_FDB-aA98lmbreS-PgBdFv9IyCTXOh6hfeOTPO5w3Lht9z1WOAmiGHCHcmfk0qGTDGDzjisRhlofDetCaAtyvH1qoyju0CIjp9VWiiLlV-oZ0at9fJiStLjs6oGbJtCf-r34HeKxRA'
        ]

        valid.forEach((value: string): void => {
            const url = validate.isWebToken(value)
            expect(url).toBe(value)
        })

        invalid.forEach((value: string): void => {
            expect((): string => validate.isWebToken(value)).toThrow(new ArgumentError(`'${value}' is not a valid WebToken!`))
        })
    })

    test('Latitude & Longitude', (): void => {
        const valid: { latitude: number, longitude: number }[] = [
            { latitude: 38.8951, longitude: -77.0364 },
        ]
        // tslint:disable-next-line:no-any
        const invalid: { latitude: any, longitude: any }[] = [
            { latitude: 100, longitude: 200},
        ]

        valid.forEach((value: { latitude: number, longitude: number}): void => {
            const { latitude, longitude } = validate.isLocation(value.latitude, value.longitude)

            expect(latitude).toBe(value.latitude)
            expect(longitude).toBe(value.longitude)
        })

        invalid.forEach((value: { latitude: number, longitude: number}): void => {
            expect((): { } => validate.isLocation(value.latitude, value.longitude))
                .toThrow(new ArgumentError(`'${value.latitude}'/'${value.longitude}' is not a valid Location`))
        })

        // - String sollte auch invalid sein!
        
        // @ts-ignore
        expect((): { } => validate.isLocation("38.8951", -77.0364))
            .toThrow(new ArgumentError(`Invalid type - '38.8951' is not a number!`))
    })

    const returnsStringOrUndefined: (input: string | undefined) => string | undefined = (
        input: string | undefined
    ): string | undefined => input
})
