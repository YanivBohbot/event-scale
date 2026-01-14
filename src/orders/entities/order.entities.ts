import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Users } from '../../users/user.entity';
import { Ticket } from './ticket.entities'; // (ניצור מיד)

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  // מי המשתמש שביצע את ההזמנה
  @ManyToOne(() => Users, { eager: false })
  user: Users;

  // ההזמנה מכילה כרטיסים
  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[];
}
