import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Order } from './order.entities';
import { Event } from '../../events/entities/event.entity';
import { TicketCategory } from '../../events/entities/ticket-category.entity';

@Entity('tickets')
export class Ticket extends BaseEntity {
  // לאיזו הזמנה הכרטיס שייך
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;

  // לאיזה אירוע הכרטיס שייך (לנוחות שליפה)
  @ManyToOne(() => Event)
  event: Event;

  // איזה סוג כרטיס זה (VIP/רגיל)
  @ManyToOne(() => TicketCategory)
  category: TicketCategory;
}
