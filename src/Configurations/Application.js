import express from 'express';

export class Application 
{
    constructor(container)
    {
        this.app = express();
        this.container = container;
    }

    setup()
    {
        
        this.app.use(express.json());
                this.app.use(express.urlencoded({ extended: true }));

        const authController = this.container.get("authController");

        this.app.get('/health' , (req , res )=> {
            res.json({status:'Up', timestamp : new Date()});
        });
        
        this.app.post("/api/v1/auth/register", authController.register.bind(authController));
        this.app.post("/api/v1/auth/login", authController.login.bind(authController));

        return this.app;
    }
}