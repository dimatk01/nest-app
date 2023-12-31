"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./common/filters/exception.filter");
const response_interseptor_1 = require("./common/interseptors/response.interseptor");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new response_interseptor_1.ResponseInterseptor());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest test-task docs')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3100, () => {
        console.log('Api started on port: ' + process.env.PORT ?? 3100);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map