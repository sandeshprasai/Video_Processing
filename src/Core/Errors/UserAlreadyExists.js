export class UserAlreadyExists extends Error
{
    constructor(statusCode , message )
    {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}