import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../users/user.entity';
import { Event } from '../events/entities/event.entity';
import { Venue } from '../events/entities/venue.entity';
import { TicketCategory } from '../events/entities/ticket-category.entity';
import { AppModule } from '../app.module';

@Module({
  imports: [
    AppModule, // כדי לקבל את החיבור ל-DB
    TypeOrmModule.forFeature([User, Event, Venue, TicketCategory]), // גישה לטבלאות
  ],
  providers: [SeedService],
})
export class SeedModule {}
