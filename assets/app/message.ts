export class Message {
    content: string;
    username: string;
    messageId: string;
    userId: string;

    // The ? behind the parameters in the constructor means,
    // that the values don't need to be available or presented.
    constructor (content: string, messageId?: string, username?: string, userId?: string) {
        this.content = content;
        this.messageId = messageId;
        this.username = username;
        this.userId = userId;
    }
}