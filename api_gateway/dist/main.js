"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const custom_exception_filter_1 = require("./filters/custom-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new custom_exception_filter_1.HttpExceptionFilter());
    app.enableCors();
    await app.listen(9000);
}
bootstrap();
//# sourceMappingURL=main.js.map