export function myCallback(): string {
    return 'Mike6';
}

/**
 * Die Kombi ?: macht den Parameter optional
 *
 * @param name
 * @param age
 */
export function functionWithOptionalParams(name: string, age?: number): string {
    return `Hi ${name}, your age is ${age ? age : '<undefined>'}`;
}

export function functionWithDefaultParams(
    firstname: string,
    lastname: string = 'Mitterer',
): string {
    return `Hi ${firstname} ${lastname}`;
}
