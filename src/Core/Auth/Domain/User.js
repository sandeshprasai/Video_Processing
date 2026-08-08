export class User
{
    constructor({id, email , password , createdAt})
    {
        this.id = id;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}