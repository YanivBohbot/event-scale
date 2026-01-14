import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  // יצירת הקשר (Context) של אפליקציה ללא שרת HTTP
  const app = await NestFactory.createApplicationContext(SeedModule);

  // שליפת הסרוויס מתוך המערכת
  const seedService = app.get(SeedService);

  try {
    await seedService.seed();
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    // סגירת החיבור בסיום
    await app.close();
  }
}

bootstrap();
