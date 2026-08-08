import 'dotenv/config' ;

export class Environment 
{
    constructor()
    {
        this.vars =
        {
        port : parseInt(process.env.PORT || '3000'),
        nodeEnv : process.env.NODE_ENV || 'development',
        databaseUrl : process.env.DATABASE_URL,
        redisUrl : process.env.REDIS_URL,
        jwtSecret : process.env.JWT_SECRET || 'dev_secret_key'
        }
        this.#validate();   
    };

    #validate()
    {
        const required = ['databaseUrl', 'redisUrl'];

        required.forEach(key => {
            if(!this.vars[key])
                throw new Error(`Config Error : Missing $ {key}`);
        });
    } 
    get(key)
    {
        return this.vars[key];
    }   
}

