import { BaseEntity, Column, Entity } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ unique: true }) // / אימייל חייב להיות ייחודי
  email: string;

  @Column({ select: false }) // אבטחה: כשאנחנו שולפים משתמש, אל תביא את הסיסמה אלא אם ביקשנו במפורש
  password: false;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER, // ברירת מחדל
  })
  role: UserRole;
}
