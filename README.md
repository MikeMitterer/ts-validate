# Validate
> Lightweight TS library for validating function arguments.

## Installation

    npm i @mmit/validate
    yarn add @mmit/validate

# API changed v 0.3.0
The return value of the following functions changed from **boolean** to **string**:

      isPassword
      isAlphanumeric
      isHex
      isUuid
      isUrl
      isEmail
      isHostname
      matchesPattern

`isIndexValid` returns now the validated **array value** instead of the array index      

## Usage

```typescript
import * as validate from '@mmit/validate';

validate.isHex('1234567890abcdef');

// This throws an ArgumentError with "'1234567890abcdefg' is not a hex value"
validate.isHex('1234567890abcdefg');

// The same but with your custom error message
validate.isHex('1234567890abcdefg', () => 'My custom message');

type MyName = string | undefined;

const sayMyName = (name: MyName): MyName => name;

// This would lead to: "Type 'string | undefined' is not assignable
// to type 'string'
// const checkedName = (name: MyName): string => sayMyName(name);

// Checked version strips out "undefined"
const checkedName = (name: MyName): string => validate.notNull(sayMyName(name));

expect(checkedName("Mike")).toBe("Mike");
expect(() => checkedName(undefined)).toThrow(ArgumentError);
```

For more examples - pls check out my [Tests](https://github.com/MikeMitterer/ts-validate/tree/master/src/test/unit/validate)

## Bugs / Contribute

You reach me via [GH - Issues](https://github.com/MikeMitterer/ts-validate/issues)

Help is always welcome!

## License

    MIT License

    Copyright (c) 2019, Mike Mitterer <office@mikemitterer.at>

    Mike Mitterer: http://www.MikeMitterer.at/

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
