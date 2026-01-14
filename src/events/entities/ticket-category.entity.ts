import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Event } from './event.entity';

@Entity('ticket_categories')
export class TicketCategory extends BaseEntity {
  @Column()
  name: string; // שם הקטגוריה (למשל: "VIP Front Row")

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // מחיר (למשל 150.00)

  @Column('int')
  totalQuantity: number; // סה"כ כרטיסים שהוקצו לקטגוריה זו

  @Column('int')
  availableQuantity: number; // כמה נשארו כרגע (זה השדה הקריטי לניהול העומסים!)

  // חיבור לאירוע האב
  @ManyToOne(() => Event, (event) => event.ticketCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column()
  eventId: string;
}
