import Room from 'src/rooms/entities/room.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import Payment from 'src/payment/entities/payment.entity';
@Entity('reservations')
export default class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  init_date: Date;
  @Column({ type: 'date' })
  end_date: Date;
  @Column({ type: 'int' })
  nit: number;
  @ManyToOne(() => User, (user) => user.reservations)
  users: User;
  @ManyToOne(() => Room, (room) => room.reservations)
  rooms: Room;
  
  @OneToOne(() => Payment)
  @JoinColumn({name: 'payment_id'})
  payment: Payment;
}
