import jwt from 'jsonwebtoken';
import {AuthProviderPort} from '../../Core/Auth/Ports/AuthProviderPort.js'

export class AuthProvider extends AuthProviderPort
{
    constructor(secret , expiresIn)
    {
        super();
        this.secret = secret;
        this.expiresIn =expiresIn;
    }

    generateToken(payload)
    {
         const token = jwt.sign(payload, this.secret , {expiresIn : this.expiresIn} )
         return token;
    }
}