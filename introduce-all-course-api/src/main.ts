import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (process.env.APP_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle("로봇다이브 API")
      .setVersion("1.0.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(process.env.PORT || 8000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
