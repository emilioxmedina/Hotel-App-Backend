import { ApiProperty } from '@nestjs/swagger';
import Reservation from 'src/reservations/entities/reservations.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export default class Room {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  room_number: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  num_beds: number;

  @Column()
  @ApiProperty()
  num_people: number;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ default: false })
  @ApiProperty()
  occupied?: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.rooms)
  reservations: Reservation[];
}
