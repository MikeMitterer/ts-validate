import ArgumentError from './exception/ArgumentError';

type Message = () => string;

export function isTrue(expression: boolean, message: Message) {
    if (!expression) {
        throw new ArgumentError(message());
    }
}
