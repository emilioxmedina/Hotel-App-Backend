import Room from 'src/rooms/entities/room.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservations')
export default class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  init_date: Date;
  @Column({ type: 'date' })
  end_date: Date;
  @ManyToOne(() => User, (user) => user.reservations)
  users: User;
  @ManyToOne(() => Room, (room) => room.reservations)
  rooms: Room;
}
