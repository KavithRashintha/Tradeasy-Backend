"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const custom_exception_filter_1 = require("./filters/custom-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    });
    app.useGlobalFilters(new custom_exception_filter_1.HttpExceptionFilter());
    await app.listen(9000);
    console.log(`App is running on port ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map