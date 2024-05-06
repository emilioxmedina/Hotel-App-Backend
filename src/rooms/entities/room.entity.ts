import Reservation from 'src/reservations/entities/reservations.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_number: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @Column()
  num_beds: number;

  @Column()
  num_people: number;

  @Column({ default: false })
  occupied?: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}
