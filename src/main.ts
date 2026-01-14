import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Swagger Setup ---
  const config = new DocumentBuilder()
    .setTitle('EventScale API')
    .setDescription('Ticket management system for enterprise events')
    .setVersion('1.0')
    .addBearerAuth() // מוסיף כפתור "Authorize" לטוקן
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // הכתובת תהיה /api
  // ---------------------

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // קריטי לאבטחה! מסיר שדות שלא הוגדרו ב-DTO
      forbidNonWhitelisted: true, // זורק שגיאה אם נשלח שדה לא מוכר
      transform: true, // ממיר את המידע לטיפוסים הנכונים
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
