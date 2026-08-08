import { Container } from "./Configurations/Container.js";
import { Application } from "./Configurations/Application.js";

async function bootstrap() {
    const container = new Container();
    await container.Build();

    const appWrapper = new Application(container);
    const server = appWrapper.setup();

    const port  = container.get('env').get('port');

    server.listen(port , ()=>
    {
        console.log(`Server is Running on Port ${port}`)
    })
}

bootstrap().catch(console.error)