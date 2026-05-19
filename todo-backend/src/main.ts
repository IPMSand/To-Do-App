import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CROS ---
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credintials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
