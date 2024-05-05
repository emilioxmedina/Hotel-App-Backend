import Reservation from "src/reservations/entities/reservations.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_number: number;

    @Column({ type: 'varchar', length: 44 })
    type: string;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    price: number;

    @Column({ default: false })
    occupied?: boolean;

    @OneToMany(() => Reservation, reservation => reservation.room)
    reservations: Reservation[];
}
