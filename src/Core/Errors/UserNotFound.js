export class UserNotFound extends Error
{
    constructor(statudCode , message)
    {
        super(message);
        this.name = this.constructor.name;
        this.statudCode =statudCode;
    }
}