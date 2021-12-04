export class MessageDto {
    [x: string]: any;
    message: string[] = [];

    constructor(message: string) {
        this.message[0] = message;
    }
}