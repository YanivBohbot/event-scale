import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Venue } from './venue.entity';
import { TicketCategory } from './ticket-category.entity';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  date: Date; // מתי האירוע מתקיים

  // הגדרת הצד של ה"רבים" בקשר (Many Events belong to One Venue)
  // Eager: true אומר שכשנשלוף אירוע, אוטומטית נקבל גם את פרטי האולם שלו (Join)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Venue, (venue) => venue.events, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'venueId' }) // שם העמודה ב-DB שתחזיק את ה-ID
  venue: Venue;

  // שים לב: אנחנו שומרים גם את ה-ID בנפרד לגישה נוחה, למרות ש-TypeORM עושה את זה אוטומטית
  @Column({ nullable: true })
  venueId: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => TicketCategory, (category) => category.event, {
    eager: true,
  })
  ticketCategories: TicketCategory[];
}
