"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config({ path: (0, path_1.join)(__dirname, '../../.env') });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 9003,
        },
    });
    await app.startAllMicroservices();
    await app.listen(9003);
    console.log(`App is running on port ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map