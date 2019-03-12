# Validate - Tiny TS library to

> Lightweight TS library for validating function arguments.

## Installation

    npm i @mmit/validate
    yarn add @mmit/validate

## Usage

> [Home](https://github.com/MikeMitterer/ts-validate)

## Deploy-Varianten aus packages.json

-   yarn clean

-   yarn deploy
    Erstellt die nötigen Files in `lib`

-   yarn deploy:node
    Erstellt im `bin`-Folder das File app.js dass mit `node bin app.js` aufgerufen werden kann

-   yarn deploy:web
    Browser-Part wird in `dist` veröffentlicht. Kann mit `simplehttpserver dist/` getestet werden

-   yarn test | jest
    Führt die Unit-Tests aus

## Upgrade aller packages

    yarn-upgrade-latest

## ToDo (Jenkins)

# MD5 Check von src

find ./src -not \( -path ./src/test -prune \) -type f -exec md5 {} \; | sort -k 2

# Wie oben - nur mit sum

find ./src -not \( -path ./src/test -prune \) -type f -exec md5 {} \; | sort -k 2 | md5 -r

# cmp gibt 0 zurück wenn die Files gleich sind

if ! cmp srcmd5 srcmd5.prev >/dev/null 2>&1
then
rm -f srcmd5.prev
mv srcmd5 srcmd5.prev

# restart service

fi
