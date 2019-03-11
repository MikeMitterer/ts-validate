// export namespace SmokeTest {
//
//     //noinspection JSUnusedGlobalSymbols
//     export function helloWorld6() {
//         console.log("Hello World 2");
//     }
//
//     export function sayMyName() {
//         console.log("Hello Mike44");
//     }
// }

/// Hallo Tester
export function endsWith(str: string, suffix: string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function giveAge9(): number {
    return 99;
}

export function returnMyName(): string {
    return 'Mike';
}

export function returnGerdasName(): string {
    return 'Gerda';
}
