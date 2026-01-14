import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Event } from './event.entity'; // (ניצור את זה מיד)

@Entity('venues')
export class Venue extends BaseEntity {
  @Column()
  name: string; // שם האולם (למשל: "היכל מנורה")

  @Column()
  address: string;

  @Column()
  capacity: number; // כמה אנשים נכנסים

  // הגדרת הצד של ה"אחד" בקשר (One Venue has Many Events)
  // הפרמטר הראשון: לאיזה Entity אנחנו מתחברים
  // הפרמטר השני: איזה שדה בצד השני מצביע עלינו
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Event, (event) => event.venue)
  events: Event[];
}
