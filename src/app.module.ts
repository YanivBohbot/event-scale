import {
  ConfigurableModuleBuilder,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middelware/logger.middelware';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    // 1. טעינת משתני הסביבה
    ConfigModule.forRoot({
      isGlobal: true, // מאפשר גישה למשתנים מכל מקום באפליקציה
    }),

    // 2. חיבור ל-Database בצורה אסינכרונית
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // טוען אוטומטית ישויות (Entities) שנגדיר בהמשך
        autoLoadEntities: true,

        // סנכרון אוטומטי של הטבלאות מול הקוד
        // חשוב: ב-Production זה חייב להיות false! (שם נשתמש ב-Migrations)
        synchronize: true,
      }),
    }),

    // הגדרת Cache בזיכרון
    CacheModule.register({
      isGlobal: true, // זמין בכל המודולים
      ttl: 10 * 1000, // Time To Live: למשך כמה זמן לשמור מידע? (10 שניות)
      max: 100,  // כמה פריטים מקסימום לשמור בזיכרון (כדי לא לפוצץ את ה-RAM)
 
    UsersModule,

    EventsModule,

    OrdersModule,

    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
