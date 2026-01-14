import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/user.entity';
import { UserRole } from '../users/user-role.enum';
import { Event } from '../events/entities/event.entity';
import { Venue } from '../events/entities/venue.entity';
import { TicketCategory } from '../events/entities/ticket-category.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>,
    @InjectRepository(Event) private eventRepo: Repository<Event>,
    @InjectRepository(TicketCategory)
    private ticketCategoryRepo: Repository<TicketCategory>,
  ) {}

  async seed() {
    console.log('🌱 Starting Seed...');

    // 1. ניקוי נתונים ישנים (מחיקה בסדר הפוך בגלל Foreign Keys)
    // הערה: בפרויקט אמיתי ב-Prod נזהרים מאוד עם הפקודות האלו!
    await this.ticketCategoryRepo.delete({});
    await this.eventRepo.delete({});
    await this.venueRepo.delete({});
    await this.userRepo.delete({});

    // 2. יצירת משתמשים
    const admin = this.userRepo.create({
      email: 'admin@test.com',
      password: 'password123', // בהמשך נצפין את זה
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    });

    const user = this.userRepo.create({
      email: 'user@test.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
    });

    await this.userRepo.save([admin, user]);

    // 3. יצירת אולם (Venue)
    const venue = this.venueRepo.create({
      name: 'Menora Mivtachim Arena',
      address: 'Tel Aviv, Israel',
      capacity: 10000,
    });

    // שומרים קודם את האולם כדי שיהיה לו ID
    const savedVenue = await this.venueRepo.save(venue);

    // 4. יצירת אירוע (Event)
    const event = this.eventRepo.create({
      title: 'Imagine Dragons Live',
      description: 'The best show in Tel Aviv!',
      date: new Date('2026-06-15T20:00:00'),
      venue: savedVenue, // קישור לאובייקט האולם
    });

    const savedEvent = await this.eventRepo.save(event);

    // 5. יצירת קטגוריות כרטיסים (Ticket Categories)
    const vipTicket = this.ticketCategoryRepo.create({
      name: 'VIP Golden Ring',
      price: 500,
      totalQuantity: 50,
      availableQuantity: 50, // בהתחלה הכל פנוי
      event: savedEvent,
    });

    const regularTicket = this.ticketCategoryRepo.create({
      name: 'Standard Seat',
      price: 250,
      totalQuantity: 200,
      availableQuantity: 200,
      event: savedEvent,
    });

    await this.ticketCategoryRepo.save([vipTicket, regularTicket]);

    console.log('✅ Seeding Complete!');
  }
}
